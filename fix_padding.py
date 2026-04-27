with open("components/ui/booking-modal.tsx", "r") as f:
    content = f.read()

content = content.replace("p-2 2xl:p-3 md:p-3 2xl:p-4", "p-2 md:p-3 2xl:p-4")

with open("components/ui/booking-modal.tsx", "w") as f:
    f.write(content)
