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
        
        # Get background color from the top left corner of the crop
        bg_pixel = top_right.getpixel((10, 10))
        bg_l = 0.299 * bg_pixel[0] + 0.587 * bg_pixel[1] + 0.114 * bg_pixel[2]
        
        w, h = top_right.size
        
        # We want to find the bounding box of the TEXT.
        # The vertical lines are thin. We can count the number of dark pixels per row.
        # If a row only has a few dark pixels (e.g. < 20), it's probably just the vertical line.
        # Text rows will have many dark pixels.
        
        row_dark_counts = [0] * h
        col_dark_counts = [0] * w
        
        for y in range(h):
            for x in range(w):
                pixel = top_right.getpixel((x, y))
                l = 0.299 * pixel[0] + 0.587 * pixel[1] + 0.114 * pixel[2]
                if l < bg_l - 20: # significantly darker than background
                    row_dark_counts[y] += 1
                    col_dark_counts[x] += 1
                    
        # Find min_y and max_y by requiring at least 20 dark pixels
        min_y = h
        max_y = 0
        for y in range(h):
            if row_dark_counts[y] > 20:
                if y < min_y: min_y = y
                if y > max_y: max_y = y
                
        # Find min_x and max_x by requiring at least 2 dark pixels 
        # (vertical line might have been removed, but text spans wide)
        min_x = w
        max_x = 0
        for x in range(w):
            if col_dark_counts[x] > 2:
                if x < min_x: min_x = x
                if x > max_x: max_x = x
                
        # Add a small margin
        margin = 10
        min_x = max(0, min_x - margin)
        min_y = max(0, min_y - margin)
        max_x = min(w, max_x + margin)
        max_y = min(h, max_y + margin)
        
        tight_box = (min_x, min_y, max_x, max_y)
        top_right_tight = top_right.crop(tight_box)
        
        # Now create transparent version
        transparent_data = []
        tight_data = top_right_tight.getdata()
        
        for item in tight_data:
            l = 0.299 * item[0] + 0.587 * item[1] + 0.114 * item[2]
            
            if l >= bg_l - 5: 
                alpha = 0
            else:
                alpha = int(255 * ( (bg_l - 5 - l) / (bg_l - 5) ))
                alpha = min(255, max(0, alpha))
                
            transparent_data.append((40, 40, 40, alpha))
            
        transparent_img = Image.new("RGBA", top_right_tight.size)
        transparent_img.putdata(transparent_data)
        
        # Upscale (2x)
        new_size = (transparent_img.size[0] * 2, transparent_img.size[1] * 2)
        tight_transparent = transparent_img.resize(new_size, Image.LANCZOS)
        
        os.makedirs(output_dir, exist_ok=True)
        
        tight_transparent.save(os.path.join(output_dir, "logo_deleuran_transparent.png"))
        print(f"Successfully processed logo without lines. Size: {tight_transparent.size}")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    process_logo("LOGO til ny salon.png", "public/images")
