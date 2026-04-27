import math

points = 10
cx, cy = 50, 60
rx, ry = 35, 50
scallopDepth = 8
path = ""

for i in range(points):
    theta = (i / points) * math.pi * 2
    nextTheta = ((i + 1) / points) * math.pi * 2
    midTheta = ((i + 0.5) / points) * math.pi * 2
    
    x = cx + rx * math.cos(theta)
    y = cy + ry * math.sin(theta)
    
    midX = cx + (rx + scallopDepth) * math.cos(midTheta)
    midY = cy + (ry + scallopDepth) * math.sin(midTheta)
    
    nextX = cx + rx * math.cos(nextTheta)
    nextY = cy + ry * math.sin(nextTheta)
    
    if i == 0:
        path += f"M {x:.2f} {y:.2f} "
    path += f"Q {midX:.2f} {midY:.2f} {nextX:.2f} {nextY:.2f} "

print(path)
