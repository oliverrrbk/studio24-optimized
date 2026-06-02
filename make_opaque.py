import os
from PIL import Image

def make_opaque(input_path, output_path, bg_color=(253, 251, 247, 255)): # #FDFBF7
    try:
        img = Image.open(input_path).convert("RGBA")
        padding = 150
        # Create a new image with the background color and extra padding
        new_size = (img.size[0] + 2 * padding, img.size[1] + 2 * padding)
        bg = Image.new("RGBA", new_size, bg_color)
        # Paste using alpha channel as mask
        bg.paste(img, (padding, padding), img)
        # Save as RGB to drop alpha channel (completely opaque)
        bg.convert("RGB").save(output_path)
        print(f"Saved opaque version to {output_path}")
    except Exception as e:
        print(f"Error processing {input_path}: {e}")

if __name__ == "__main__":
    make_opaque("public/images/logo_deleuran_transparent.png", "new_logos/logo_1_opaque.png")
    make_opaque("public/images/logo_deleuran_stacked.png", "new_logos/logo_2_opaque.png")
