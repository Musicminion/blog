# /bin/bash

# 本脚本用来把 source/_posts_src 里面的博客文件复制到 source/_posts 目录下，并把所有的markdown文件移动到上一级目录。

# 需要在 source/_posts_src 目录下执行
# 先检查当前目录是否存在 source/_posts_src，如果不存在直接退出报错
if [ ! -d "source/_posts_src" ]; then
  echo "source/_posts_src directory does not exist. Exiting."
  exit 1
fi


# 检查 source/_posts 目录是否存在，如果不存在则创建
if [ ! -d "source/_posts" ]; then
  echo "Creating source/_posts directory."
  mkdir -p source/_posts
fi


# 删除 source/_posts 目录下的所有文件
echo "Deleting all files in source/_posts directory."
rm -rf source/_posts/*


# 复制 source/_posts_src 目录下的所有文件到 source/_posts 目录下
echo "Copying files from source/_posts_src to source/_posts."
cp -r source/_posts_src/* source/_posts/


# 对于递归 source/_posts 目录下的所有 markdown 文件，检查他和所在的父目录是否同名
# 如果同名则将其移动到上一级目录
echo "Moving markdown files to parent directory if they have the same name as their parent directory."
find source/_posts -type f -name "*.md" | while read file; do
  # 获取文件名和父目录名
  filename=$(basename "$file")
  parentdir=$(basename "$(dirname "$file")")

  # 检查文件名和父目录名是否相同 这里放宽要求只要小写字母一样就可以
  filename_lower=$(echo "$filename" | tr '[:upper:]' '[:lower:]')
  parentdir_md_lower=$(echo "$parentdir.md" | tr '[:upper:]' '[:lower:]')
  
  if [ "$filename_lower" = "$parentdir_md_lower" ]; then
    echo "Moving $file to $(dirname "$file")/../$filename"
    mv "$file" "$(dirname "$file")/../$filename"
  fi
done


# 完成任务，告诉用户
echo "All files have been copied and moved as necessary."
echo "You can now check the source/_posts directory for the updated files."
# 结束脚本
exit 0
# --- END OF SCRIPT ---
