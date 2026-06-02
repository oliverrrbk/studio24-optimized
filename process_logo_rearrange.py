import sys
import math
import os
from PIL import Image

def process_logo(input_path, output_dir):
    try:
        img = Image.open(input_path).convert("RGBA")
        width, height = img.size
        
        # Crop top right quadrant
        top_right = img.crop((width // 2, 0, width, height // 2))
        
        bg_pixel = top_right.getpixel((10, 10))
        bg_l = 0.299 * bg_pixel[0] + 0.587 * bg_pixel[1] + 0.114 * bg_pixel[2]
        
        w, h = top_right.size
        
        # Create an alpha mask where dark pixels are 255 and light pixels are 0
        mask = Image.new('L', (w, h), 0)
        mask_data = []
        for item in top_right.getdata():
            l = 0.299 * item[0] + 0.587 * item[1] + 0.114 * item[2]
            if l < bg_l - 20:
                mask_data.append(255)
            else:
                mask_data.append(0)
        mask.putdata(mask_data)
        
        row_counts = [0] * h
        for y in range(h):
            for x in range(w):
                if mask.getpixel((x, y)) > 0:
                    row_counts[y] += 1
                    
        # Find horizontal bands
        bands = []
        in_band = False
        start_y = 0
        for y in range(h):
            if row_counts[y] > 10: # threshold to ignore vertical lines
                if not in_band:
                    in_band = True
                    start_y = y
            else:
                if in_band:
                    in_band = False
                    bands.append((start_y, y))
                    
        # bands should be: [DELEURAN, SALON . EST. 2024]
        # (Assuming the vertical lines have row_counts < 10)
        print("Bands found:", bands)
        
        if len(bands) < 2:
            print("Could not find both DELEURAN and SALON bands.")
            return
            
        deleuran_band = bands[0]
        salon_band = bands[-1] # The last band is SALON . EST. 2024
        
        deleuran_img = top_right.crop((0, deleuran_band[0], w, deleuran_band[1]))
        
        # To crop DELEURAN tight on X:
        deleuran_col_counts = [0] * w
        for x in range(w):
            for y in range(deleuran_band[0], deleuran_band[1]):
                if mask.getpixel((x, y)) > 0:
                    deleuran_col_counts[x] += 1
        d_min_x = w; d_max_x = 0
        for x in range(w):
            if deleuran_col_counts[x] > 0:
                d_min_x = min(d_min_x, x)
                d_max_x = max(d_max_x, x)
        deleuran_img = deleuran_img.crop((d_min_x, 0, d_max_x, deleuran_img.size[1]))
        
        # Now process SALON . EST. 2024 band
        salon_band_img = top_right.crop((0, salon_band[0], w, salon_band[1]))
        s_col_counts = [0] * w
        for x in range(w):
            for y in range(salon_band[0], salon_band[1]):
                if mask.getpixel((x, y)) > 0:
                    s_col_counts[x] += 1
                    
        # Find X components in SALON band
        s_components = []
        in_comp = False
        start_x = 0
        for x in range(w):
            if s_col_counts[x] > 0:
                if not in_comp:
                    in_comp = True
                    start_x = x
            else:
                if in_comp:
                    # check if the gap is big enough or if we just ended a word
                    # actually, letters might have small gaps. We want to find the big gaps between words.
                    in_comp = False
                    s_components.append((start_x, x))
        
        # We need to merge components that are close to each other (letters in a word)
        # Gap between SALON and . and EST is much larger than gaps between letters.
        merged_comps = []
        if s_components:
            curr = s_components[0]
            for comp in s_components[1:]:
                gap = comp[0] - curr[1]
                if gap < 20: # small gap -> same word
                    curr = (curr[0], comp[1])
                else:
                    merged_comps.append(curr)
                    curr = comp
            merged_comps.append(curr)
            
        print("Merged components in SALON band:", merged_comps)
        
        if len(merged_comps) >= 3:
            salon_img = salon_band_img.crop((merged_comps[0][0], 0, merged_comps[0][1], salon_band_img.size[1]))
            est_img = salon_band_img.crop((merged_comps[2][0], 0, merged_comps[-1][1], salon_band_img.size[1]))
        else:
            print("Could not separate SALON and EST.")
            return
            
        # Create new image
        # Calculate dimensions
        gap_y = 90
        new_w = deleuran_img.size[0]
        new_h = salon_img.size[1] + gap_y + deleuran_img.size[1] + gap_y + est_img.size[1]
        
        new_img = Image.new("RGBA", (new_w, new_h), (255, 255, 255, 0))
        
        # Paste centered
        # SALON
        sx = (new_w - salon_img.size[0]) // 2
        sy = 0
        new_img.paste(salon_img, (sx, sy))
        
        # DELEURAN
        dx = (new_w - deleuran_img.size[0]) // 2
        dy = sy + salon_img.size[1] + gap_y
        new_img.paste(deleuran_img, (dx, dy))
        
        # EST. 2024
        ex = (new_w - est_img.size[0]) // 2
        ey = dy + deleuran_img.size[1] + gap_y
        new_img.paste(est_img, (ex, ey))
        
        # Now we have a re-arranged image with original beige background!
        # We need to make the beige transparent, like we did before.
        # But wait, we pasted the original pixels (which have beige bg).
        # When we paste them onto transparent, they still have beige bg blocks!
        # So we should make the WHOLE new_img transparent by calculating alpha.
        
        final_data = []
        for item in new_img.getdata():
            if item[3] == 0: # Already transparent from new_img background
                final_data.append((40, 40, 40, 0))
                continue
                
            l = 0.299 * item[0] + 0.587 * item[1] + 0.114 * item[2]
            if l >= bg_l - 5: 
                alpha = 0
            else:
                alpha = int(255 * ( (bg_l - 5 - l) / (bg_l - 5) ))
                alpha = min(255, max(0, alpha))
            final_data.append((40, 40, 40, alpha))
            
        final_img = Image.new("RGBA", new_img.size)
        final_img.putdata(final_data)
        
        # Upscale
        final_size = (final_img.size[0] * 2, final_img.size[1] * 2)
        final_img = final_img.resize(final_size, Image.LANCZOS)
        
        os.makedirs(output_dir, exist_ok=True)
        final_img.save(os.path.join(output_dir, "logo_rearranged.png"))
        print("Successfully created rearranged logo.")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    process_logo("LOGO til ny salon.png", "new_logos")
