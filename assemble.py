import os

ROOT = os.path.dirname(os.path.abspath(__file__))
PART = os.path.join(ROOT, "_partials")
CONTENT = os.path.join(ROOT, "_content")

with open(os.path.join(PART, "head-top.html"), encoding="utf-8") as f:
    head_top = f.read()
with open(os.path.join(PART, "header.html"), encoding="utf-8") as f:
    header = f.read()
with open(os.path.join(PART, "footer.html"), encoding="utf-8") as f:
    footer = f.read()

pages = [
    "index", "chi-siamo", "servizi", "gallery", "recensioni",
    "blog", "blog-1", "blog-2", "blog-3", "faq", "contatti",
    "privacy-cookie-policy",
]

for p in pages:
    with open(os.path.join(CONTENT, f"{p}.head.html"), encoding="utf-8") as f:
        head_extra = f.read()
    with open(os.path.join(CONTENT, f"{p}.body.html"), encoding="utf-8") as f:
        body = f.read()

    html = (
        head_top + "\n" + head_extra + "\n</head>\n"
        '<body class="antialiased">\n'
        + header + "\n" + body + "\n" + footer
    )
    out_path = os.path.join(ROOT, f"{p}.html")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(html)
    print("wrote", out_path)
