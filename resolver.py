import re

with open('.github/workflows/azure-static-web-apps-happy-island-0382bdc1e.yml', 'r') as f:
    content = f.read()

# Pattern matches the entire conflict block
pattern = r'<<<<<<< Updated upstream.*?\n=======\n.*?>>>>>>> Stashed changes'
replacement = "    if: github.event_name == 'push' || (github.event_name == 'pull_request' && github.event.action != 'closed' && github.head_ref != 'add-clamp-utility-tests-18323100520824437596' && github.head_ref != 'add-blog-section-10597797719136655377' && github.head_ref != 'feat/update-blog-content-11807806286163808016' && github.head_ref != 'update-carecloud-v2')"

new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)

with open('.github/workflows/azure-static-web-apps-happy-island-0382bdc1e.yml', 'w') as f:
    f.write(new_content)

print("Conflict resolved.")
