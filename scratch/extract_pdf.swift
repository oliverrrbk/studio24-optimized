
import Foundation
import Quartz

let path = CommandLine.arguments[1]
guard let url = URL(string: "file://" + path.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed)!),
      let pdf = PDFDocument(url: url) else {
    print("Failed to open PDF")
    exit(1)
}

var fullText = ""
for i in 0..<pdf.pageCount {
    if let page = pdf.page(at: i), let text = page.string {
        fullText += text + "\n"
    }
}
print(fullText)
