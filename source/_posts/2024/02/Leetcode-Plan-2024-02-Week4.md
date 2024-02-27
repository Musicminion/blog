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

### 周二

#### 1）插曲题

今天的题目有些难，涉及到一个质数的判断题（需要学会**埃氏筛**）。**埃氏筛**题目的就是给定整数 `n` ，返回 所有小于非负整数 `n` 的质数的数量。

- 首先我们从2开始，2是质数，如果2是质数，那么$2m(m \geq 2)$都是合数，不是质数，我们标记为0
- 然后我们往后读取，假设这个数是$X$
  - 如果标记为0，那就是合数（因为他标记0，肯定是来源前面的某个质数的倍数）
  - 如果标记不是0，那一定是质数（为什么？因为$X$是合数，那么一定是某个质数$Y$的整数倍，$X = kY$）而我们前面一定已经扫描过了$Y$，$Y$​的倍数都被标记上了！所以我们他一定是质数
  - 当然这里还可以继续优化，对于一个质数 $x$，如果按上文说的我们从 $2x$ 开始标记其实是冗余的，应该直接从 $x \times x$ 开始标记，因为 $2x, 3x$ 这些数一定在 $x$ 之前就被其他数的倍数标记过了，例如 2 的所有倍数，3 的所有倍数等。


```cpp
class Solution {
public:
    int countPrimes(int n) {
        if (n <= 1)
            return 0;
        int result = 0;

        // 初始化相信所有的都是质数
        vector<int> resultData(n, 1);

        // 0 1 都不是质数，手动修改
        if(n >= 1)
            resultData[0] = 0;
        if(n >= 2)
            resultData[1] = 0;

        for (long long int i = 2; i < n; i++) {
            // 如果i是质数
            if (resultData[i] == 1) {
                result += 1;
                for (long long int j = i * i; j < (long long int)n; j += i) {
                    resultData[j] = 0;
                }
            }

        }

        return result;
    }
};
```

#### 2）难度题

给你一棵 `n` 个节点的无向树，节点编号为 `1` 到 `n` 。给你一个整数 `n` 和一个长度为 `n - 1` 的二维整数数组 `edges` ，其中 `edges[i] = [ui, vi]` 表示节点 `ui` 和 `vi` 在树中有一条边。

请你返回树中的 **合法路径数目** 。

如果在节点 `a` 到节点 `b` 之间 **恰好有一个** 节点的编号是质数，那么我们称路径 `(a, b)` 是 **合法的** 。

**注意：**

- 路径 `(a, b)` 指的是一条从节点 `a` 开始到节点 `b` 结束的一个节点序列，序列中的节点 **互不相同** ，且相邻节点之间在树上有一条边。
- 路径 `(a, b)` 和路径 `(b, a)` 视为 **同一条** 路径，且只计入答案 **一次** 。

说实话这个题目我看的就很懵，也很清楚这个题目就是个缝合怪，缝合了两个东西：

- 质数判断（肯定有一种比较快速判断一组数里面哪些质数的）
- 然后就是图相关的搜索、BFS、DFS（这两个我都不是很熟悉）

仔细读题，我们发现就是找路径，要找一个路径在节点 `a` 到节点 `b` 之间 **恰好有一个** 节点的编号是质数。那问题就简单了，我们要把所有的质数节点找出来，遍历一次，把这个节点对应的路径数量求出来，再求个和。

但是问题就来了，怎么把这个节点对应的路径数量求出来。如下图所示，我目前搜索的是**中间质数节点**的有关的合法路径，现在发现他连着三个子图，还有一个右下角质数节点

- 首先右下角的质数节点不考虑，为什么？没必要，肯定不合法
- 然后我们依次考虑左上、右上、左下角的三个子图，我们以蓝色的合数节点分别为起点，做DFS搜索这个子图里面可以连通的节点的数量（只考虑合数节点）。
  - 左上子图的对应的，可以连通的（只考虑合数节点）节点数量是$X$
  - 右上的对应$Y$，左下的对应$Z$
  - 那么当前这个中心质数节点，所有的合法路径的数量就是$X+Y+Z+XY+XZ+YZ$
  - 好了这个题目就写出来了
- 仔细把这个图想的更一般一些，这个图里面**可以连通的合数节点**我们可以把他抽象成一个子图，然后对于这些子图，我们只需要做一次DFS就够了，这样可以节约时间，官方题解里面用了count数组，记录每个节点所在的子图中，节点的数量（反正都是连通的嘛）

![演示图](./Leetcode-Plan-2024-02-Week4/day2-solution)

最终的代码：

- 一部分埃氏筛，这是个Lambda 表达式`[]() { /* code */ }`，整个 Lambda 表达式后面的 `()` 表示立即执行该 Lambda 表达式。
- 一部分dfs，深度优先搜索，这个写过，但是容易忘了，核心思想是递归
- 然后就是图的路径搜索，最后需要整合再一块，需要对图理解清楚
- 总之上面的三个知识点都比较难，最难的是把前面两个整合起来，写出代码！

```cpp
const int N = 100001;
bool isPrime[N];
int init = []() {
    // 埃氏筛
    fill(begin(isPrime), end(isPrime), true);
    isPrime[1] = false;
    for (int i = 2; i * i < N; i++) {
        if (isPrime[i]) {
            for (int j = i * i; j < N; j += i) {
                isPrime[j] = false;
            }
        }
    }
    return 0;
}();

class Solution {
private:
    // dfs的算法确实要好好复习了！seen是已经走过的节点，然后i是当前节点
    // pre表示的是来的时候的路径，避免走回头路
    void dfs(const vector<vector<int>>& G, vector<int>& seen, int i, int pre) {
        seen.push_back(i);
        for (int j : G[i]) {
            if (j != pre && !isPrime[j]) {
                dfs(G, seen, j, i);
            }
        }
    }
public:
    long long countPaths(int n, const vector<vector<int>>& edges) {
        fill(begin(isPrime), end(isPrime), true);
        isPrime[1] = false;
        for (int i = 2; i * i <= n; i++) {
            if (isPrime[i]) {
                for (int j = i * i; j <= n; j += i) {
                    isPrime[j] = false;
                }
            }
        }

        vector<vector<int>> G(n + 1);
        for (const auto& edge : edges) {
            int i = edge[0];
            int j = edge[1];
            G[i].push_back(j);
            G[j].push_back(i);
        }

        vector<int> seen;
        long long res = 0;
        vector<long long> count(n + 1, 0);
        for (int i = 1; i <= n; i++) {
            if (!isPrime[i]) {
                continue;
            }
            long long cur = 0;
            
            // surrounding 就是记录当前的j节点所在的子图里面，有多少种路径
            vector<long long> surrounding;
            for (int j : G[i]) {
                if (isPrime[j]) {
                    continue;
                }
                if (count[j] == 0) {
                    seen.clear();
                    dfs(G, seen, j, 0);
                    long long cnt = seen.size();
                    for (int k : seen) {
                        count[k] = cnt;
                    }
                }
                surrounding.push_back(count[j]);
            }

            for(int x = 0; x < surrounding.size(); x++){
                cur += surrounding[x];
            }

            int sum = 0;
            for(int x = 0; x < surrounding.size(); x++){
                cur += sum * surrounding[x];
                sum += surrounding[x];
            }
            res += cur;
        }
        return res;
    }
};

```









