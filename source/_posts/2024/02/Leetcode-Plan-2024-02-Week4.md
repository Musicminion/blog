---
title: Leetcode计划：2024年二月第四周
tags: [Leetcode, 刷题]
date: 2024-02-26 21:40:00
updated: 2024-02-26 21:40:00
index_img: 2024/02/Leetcode-Plan-2024-02-Week4/打卡.png
banner_img: 2024/02/Leetcode-Plan-2024-02-Week4/打卡.png
author: Musicminion
---


## Leetcode计划：2024年二月第四周

> 由于本人寒假摸鱼，大四上学期一直在考研，寒假又在摸（原）鱼（神），所以曾经熟练的c++又变得生疏了起来，Leetcode是时候启动了！在不启动考研机考都要慌了！目前的计划是：
>
> 每天一题，如果很简单的，要求用c++和go两种语言写，如果是很难的可以只用c++写。

|   日期   |                             周一                             | 周二 | 周三 | 周四 | 周五 | 周六 | 周日 | 统计率 |
| :------: | :----------------------------------------------------------: | :--: | :--: | :--: | :--: | :--: | :--: | :----: |
| 是否完成 |                      :white_check_mark:                      |      |      |      |      |      |      |        |
| 独立完成 |                      :white_check_mark:                      |      |      |      |      |      |      |        |
| 题目链接 | [938](https://leetcode.cn/problems/range-sum-of-bst/description/) |      |      |      |      |      |      |        |

### 周一

题目很简洁，给定二叉搜索树的根结点 `root`，返回值位于范围 `[low, high]` 之间的所有结点的值的和。这一看就是一道递归的题目。题目也很亲切的给我们了模板。

```cpp
class Solution {
public:
    int rangeSumBST(TreeNode* root, int low, int high) {

    }
};
```

具体来说根据区间`[low, high]`还有一个点`x=root->val`，可以考虑五种情况：

- $x>high$, 那么我们就应该在左区间找
- $x = high$，那么我们就要把当前节点算上，然后在左子树边找
- 后面的以此类推…
- 此外，如果节点不可用是null，那么要返回0

就这样，我写出来第一版代码，然后发现是错误的！

```cpp
class Solution {
public:
    int rangeSumBST(TreeNode* root, int low, int high) {
        if(root == nullptr)
            return 0;
        else if(root->val > high)
            return rangeSumBST(root->left, low, high);
        else if(root->val == high)
            return root->val + rangeSumBST(root->left, low, high - 1);
        else if(root->val < high && root->val > low)
            return root->val + rangeSumBST(root->left, low, root->val - 1) + rangeSumBST(root->right, root->val + 1, high);
        else if(root->val == low)
            return root->val + rangeSumBST(root->right, low + 1, high);
        else if(root->val < low)
            return rangeSumBST(root->right, low, high);
        return 0;
    }
};
```

仔细一看才找到问题的所在，原来是因为我忘记检查了$low<=high$这个条件，如果出现$low>high$的时候，肯定要直接返回0的。

```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    int rangeSumBST(TreeNode* root, int low, int high) {
        //            [low     hight]
        //                                  root 
        if(root == nullptr || low > high)
            return 0;
        else if(root->val > high)
            return rangeSumBST(root->left, low, high);
        else if(root->val == high)
            return root->val + rangeSumBST(root->left, low, high - 1);
        else if(root->val < high && root->val > low)
            return root->val + rangeSumBST(root->left, low, root->val - 1) + rangeSumBST(root->right, root->val + 1, high);
        else if(root->val == low)
            return root->val + rangeSumBST(root->right, low + 1, high);
        else if(root->val < low)
            return rangeSumBST(root->right, low, high);
        return 0;
    }
};
```

成功通过，按照简单题两种语言的原理，把go的版本也放上来。

```go
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    int rangeSumBST(TreeNode* root, int low, int high) {
        //            [low     hight]
        //                                  root 
        if(root == nullptr || low > high)
            return 0;
        else if(root->val > high)
            return rangeSumBST(root->left, low, high);
        else if(root->val == high)
            return root->val + rangeSumBST(root->left, low, high - 1);
        else if(root->val < high && root->val > low)
            return root->val + rangeSumBST(root->left, low, root->val - 1) + rangeSumBST(root->right, root->val + 1, high);
        else if(root->val == low)
            return root->val + rangeSumBST(root->right, low + 1, high);
        else if(root->val < low)
            return rangeSumBST(root->right, low, high);
        return 0;
    }
};
```

