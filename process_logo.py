import sys
import math
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
        
        data = top_right.getdata()
        
        # 1. First, find the tight bounding box of the text by checking darkness
        # We consider a pixel part of the text if it's significantly darker than the background
        min_x = width
        min_y = height
        max_x = 0
        max_y = 0
        
        w, h = top_right.size
        for y in range(h):
            for x in range(w):
                pixel = top_right.getpixel((x, y))
                l = 0.299 * pixel[0] + 0.587 * pixel[1] + 0.114 * pixel[2]
                if l < bg_l - 20: # threshold to ignore slight gradients
                    if x < min_x: min_x = x
                    if x > max_x: max_x = x
                    if y < min_y: min_y = y
                    if y > max_y: max_y = y
                    
        # Add a small margin
        margin = 20
        min_x = max(0, min_x - margin)
        min_y = max(0, min_y - margin)
        max_x = min(w, max_x + margin)
        max_y = min(h, max_y + margin)
        
        # Crop to bounding box
        tight_box = (min_x, min_y, max_x, max_y)
        top_right_tight = top_right.crop(tight_box)
        
        # Create transparent version
        transparent_data = []
        tight_data = top_right_tight.getdata()
        
        for item in tight_data:
            l = 0.299 * item[0] + 0.587 * item[1] + 0.114 * item[2]
            
            # For transparent version, we'll make the text color dark gray/black
            # and use the difference from background as alpha
            if l >= bg_l - 5: # slightly below bg_l to ensure total transparency for background
                alpha = 0
            else:
                # Map l from bg_l-5 down to 0  => alpha from 0 to 255
                alpha = int(255 * ( (bg_l - 5 - l) / (bg_l - 5) ))
                alpha = min(255, max(0, alpha))
                
            # For the text color, we can just use the original pixel color, or make it pure black.
            # Using the original pixel color but blending it so it doesn't have beige.
            # Since the original was blended with beige, making it black/dark brown is safer.
            # Let's just use #333333 as the base color for the dark text, since it looks like a dark color.
            transparent_data.append((40, 40, 40, alpha))
            
        transparent_img = Image.new("RGBA", top_right_tight.size)
        transparent_img.putdata(transparent_data)
        
        # Upscale (2x)
        new_size = (transparent_img.size[0] * 2, transparent_img.size[1] * 2)
        tight_transparent = transparent_img.resize(new_size, Image.LANCZOS)
        tight_opaque = top_right_tight.resize(new_size, Image.LANCZOS)
        
        import os
        os.makedirs(output_dir, exist_ok=True)
        
        tight_transparent.save(os.path.join(output_dir, "logo_transparent.png"))
        tight_opaque.save(os.path.join(output_dir, "logo_normal.png"))
        print("Successfully processed logo.")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    process_logo("LOGO til ny salon.png", "new_logos")
