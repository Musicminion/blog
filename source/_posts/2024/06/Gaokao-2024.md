---
title: 2024 年高考试卷 LaTeX 排版
tags: [LaTeX, 高考, 试卷]
date: 2024-06-18 11:07:00
updated: 2024-06-18 11:07:00
index_img: 2024/06/Gaokao-2024/banner.jpg
banner_img: 2024/06/Gaokao-2024/banner.jpg
author: Musicminion
---

## 2024 年普通高等学校招生全国统一考试试卷

> 排版：[Musicminion](https://github.com/musicminion) © [ayaka-notes](https://github.com/ayaka-notes)


### 高考语文


<iframe src="https://alist-org.github.io/pdf.js/web/viewer.html?file=https://icloud.ayaka.space/d/local/public/gaokao-2024/2024_%E9%AB%98%E8%80%83%E8%AF%AD%E6%96%87.pdf" width="100%", height="500px"></iframe>


### 高考数学

<iframe src="https://alist-org.github.io/pdf.js/web/viewer.html?file=https://icloud.ayaka.space/d/local/public/gaokao-2024/2024_%E9%AB%98%E8%80%83%E6%95%B0%E5%AD%A6.pdf" width="100%", height="500px"></iframe>


### 高考英语

<iframe src="https://alist-org.github.io/pdf.js/web/viewer.html?file=https://icloud.ayaka.space/d/local/public/gaokao-2024/2024_%E9%AB%98%E8%80%83%E8%8B%B1%E8%AF%AD.pdf" width="100%", height="500px"></iframe>



### 项目内容

本项目包含 2024 年新课标Ⅰ卷的高考试卷的 $\LaTeX$ 排版（源代码）。具体包括：
- 语文试题（页面大小 B5、共 10 页）
- 数学试题（页面大小 B5、共 4 页）
- 英语试题（页面大小 B5、共 12 页）

> 提示：新课标Ⅰ卷的适用省份有山东、河北、湖北、福建、湖南、广东、江苏，浙江。

本项目用于演示 [exam-zh](https://gitee.com/xkwxdyy/exam-zh) 在试卷排版方面的效果。也供初学者/教学工作者了解 $\LaTeX$，或使用 $\LaTeX$ 制作试卷。本试卷的样式基于（或参考）湖北省普通高等学校招生全国统一考试的试卷。

本项目开源地址：
- [ScienHub](https://scienhub.com/ayaka/gaokao-2024/)
- GitHub（敬请期待）
- Overleaf（敬请期待）

### 项目结构

- 项目中使用到 `fonts` 文件夹是排版试卷使用的字体(分别为中易隶书、中易黑体，字体仅供演示效果使用)
- 所有 `exam-zh-*` 开头的均为模版样式文件，正常情况下请不要修改。此文件相较于原 exam-zh 的模版有所改动，以便于在线平台编译
- 试卷的正文内容为：
  - 语文试卷为：`2024-chinese.tex`
  - 数学试卷为：`2024-math.tex`
  - 英语试卷为：`2024-english.tex`
- `readme.md` 用于介绍排版项目，也是您正在阅读的文档

### 排版建议

#### 排版总规则

- 无论使用 Word 还是 $\LaTeX$，请将页面大小宽度/高度调整为 19 cm x 26.5 cm （约为 B5 大小，比 A4 的纸张会略小）
- 正文的字体请使用五号（不要使用四号字体，印刷后会显得过大）
- 小题块（试卷中诸如从 `1.` 标号开始，到下一题 `2.` 标号之间的题目内容称之为一个小题块）请务必确保在同一页。常见错误/不良排版情况：
  - 选择题的题干在上一页，选项在下一页。
  - 选择题的 A、B 选项在上一页，C、D 选项在下一页。
  - 解答题的题干在上一页，问题(1)、(2) 在下一页。
- 可以适度调整题目阅读材料的行间距，以便达到整体美观的效果。
- 如果可能，尽可能保证阅读材料的行间距差异在人无感知的范围
- 尽可能方便学生答题，展现出人文关怀。例如完型填空题尽可能让题目文本和题目在同一页，避免考生考试时额外的翻页时间。

#### 语文试卷的排版

- 正常情况下，语文试卷的排版控制在 10 ~ 12 页。
  - 10 页试卷的印刷采用：6 + 4 页印刷（正常情况）
  - 12 页试卷的印刷采用：6 + 6 页印刷（文本较多时）
- 文言文的行距通常比正常文本的行距稍大一些。
- 语文的问答题直接不额外留解答空白。
- 语文的大题，例如：一、现代文阅读（35 分），使用黑体。
- 语文的大题中的某一阅读题的标题，例如：（一）现代文阅读 I（本题共 5 小题，19 分），使用宋体加粗
- 语文的阅读材料，使用楷体

#### 数学试卷的排版
- 正常情况下，数学试卷的排版控制在 4 ~ 6 页。
  - 4 页试卷的印刷采用：4 页印刷。
  - 6 页试卷的印刷采用：6 页印刷。
- 注意数学符号 $\pi$、$i$、$e$，需要采用正体，详情参考 exam-zh 的文档。
- 数学解答题之间适度留白，但不宜过多（约为 1/3 页面高）。既能够方便学生草稿，又能够避免考试误将答案作答在试卷上。

#### 英语试卷的排版
- 正常情况下，英语试卷的排版控制在 10 ~ 12 页。
  - 10 页试卷的印刷采用：6 + 4 页印刷（文本较少时）
  - 12 页试卷的印刷采用：6 + 6 页印刷（正常情况）
- 完形填空题，尽可能保证题目文本和选项在**同一页**。
- 阅读理解七选五，尽可能保证题目文本和选项在**同一页**。
- 听力题中，听第 x 段材料，回答第 x 至 x 题前，需要**适度留空**。
- 其余阅读题材料文本适当调整行距，确保满足上述需求。


### 常见问题

> 高考的试卷排版使用的是什么软件？是 Word 还是 $\LaTeX$，或者其他？

回答：高考试卷由教育部命题中心组织统一命制，命制完成后发往各省考试院以省份为单位印刷。格式通常会经过二次重排。部分省可能采用 WPS 进行排版，部分省会使用诸如方正书版的软件。目前应该尚无 $\LaTeX$ 应用到高考试卷的排版中。

> 使用 $\LaTeX$ 的 exam-zh 排版有什么优势？如何快速入门？

回答：排版优势在于样式规范、统一，不需要额外的格式校对（诸如标题格式等）可以将去年/已有的试卷模版稍加修改，即可得到新的试卷。当然，有些细节行距需要手动调节

入门方法：
- 首先使用在线编译平台（例如 Overleaf 等），编译左边的 tex 文件，然后查看右边的效果。
- 对于公式，如果不熟悉可以使用[在线公式输入编辑器](https://www.latexlive.com/)，将公式的代码拷贝过来。

> 如何调整阅读材料的行距？

回答：使用如下代码调整 1.5 倍行距。

```latex
\begin{space}{1.5}
这是你的材料。
\end{space}
```