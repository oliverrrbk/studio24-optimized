import os
from PIL import Image, ImageChops

def trim_white(im):
    bg = Image.new(im.mode, im.size, (255, 255, 255))
    diff = ImageChops.difference(im, bg)
    diff = ImageChops.add(diff, diff, 2.0, -100)
    bbox = diff.getbbox()
    if bbox:
        return im.crop(bbox)
    return im

def slice_grid(file_path, output_dir, prefix):
    img = Image.open(file_path)
    w, h = img.size
    
    # Coordinates for the 4 quadrants
    coords = [
        (0, 0, w//2, h//2),         # top-left
        (w//2, 0, w, h//2),         # top-right
        (0, h//2, w//2, h),         # bottom-left
        (w//2, h//2, w, h)          # bottom-right
    ]
    
    for i, box in enumerate(coords):
        cropped = img.crop(box)
        # trim the white border
        trimmed = trim_white(cropped)
        out_path = os.path.join(output_dir, f"{prefix}_{i+1}.png")
        trimmed.save(out_path)
        print(f"Saved {out_path}")

def main():
    os.makedirs("public/new_gallery", exist_ok=True)
    for i in range(1, 9):
        file_name = f"hairdresser-closeup-0{i}.png"
        if os.path.exists(file_name):
            slice_grid(file_name, "public/new_gallery", f"grid{i}")

if __name__ == "__main__":
    main()
