import os
try:
    dirs = [d for d in os.listdir('c:\\Users\\Dell\\Downloads\\ERP_render-main') if os.path.isdir(os.path.join('c:\\Users\\Dell\\Downloads\\ERP_render-main', d))]
    print("BACKEND DIRECTORIES:", dirs)
except Exception as e:
    print("ERROR:", e)
