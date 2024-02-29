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

|   日期   |                             周一                             |                             周二                             |                             周三                             |                             周四                             | 周五 | 周六 | 周日 | 统计率 |
| :------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :--: | :--: | :--: | :----: |
| 是否完成 |                      :white_check_mark:                      |                      :white_check_mark:                      |                      :white_check_mark:                      |                      :white_check_mark:                      |      |      |      |  4/7   |
| 独立完成 |                      :white_check_mark:                      |                :negative_squared_cross_mark:                 |                      :white_check_mark:                      |                :negative_squared_cross_mark:                 |      |      |      |  2/7   |
| 题目链接 | [938](https://leetcode.cn/problems/range-sum-of-bst/description/) | [2867](https://leetcode.cn/problems/count-valid-paths-in-a-tree/description/) | [2673](https://leetcode.cn/problems/make-costs-of-paths-equal-in-a-binary-tree/) | [2581](https://leetcode.cn/problems/count-number-of-possible-root-nodes) |      |      |      |        |

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

![演示图](./day2-solution.png)

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

### 周三

今天这个题目的图有点恶心。先把题目搬上来。

给你一个整数 `n` 表示一棵 **满二叉树** 里面节点的数目，节点编号从 `1` 到 `n` 。根节点编号为 `1` ，树中每个非叶子节点 `i` 都有两个孩子，分别是左孩子 `2 * i` 和右孩子 `2 * i + 1` 。

树中每个节点都有一个值，用下标从 **0** 开始、长度为 `n` 的整数数组 `cost` 表示，其中 `cost[i]` 是第 `i + 1` 个节点的值。每次操作，你可以将树中 **任意** 节点的值 **增加** `1` 。你可以执行操作 **任意** 次。

你的目标是让根到每一个 **叶子结点** 的路径值相等。请你返回 **最少** 需要执行增加操作多少次。

**注意：**

- **满二叉树** 指的是一棵树，它满足树中除了叶子节点外每个节点都恰好有 2 个子节点，且所有叶子节点距离根节点距离相同。
- **路径值** 指的是路径上所有节点的值之和。

比如下面的这个图

![题目图](./binaryytreeedrawio-4.png)


```
输入：n = 7, cost = [1,5,2,2,3,3,1]
输出：6
解释：我们执行以下的增加操作：
- 将节点 4 的值增加一次。
- 将节点 3 的值增加三次。
- 将节点 7 的值增加两次。
从根到叶子的每一条路径值都为 9 。
总共增加次数为 1 + 3 + 2 = 6 。
这是最小的答案。
```

说实话这个给我一个误解，我看这个例子一下就以为，要把每个地方的左右节点，都要调整的权值完全一样！比如上面图里面的2号节点，对应权值是5，左右权值是2、3，那就是2+1变成3。然后对于根节点，也是啊，左右的节点也要调成权值一样。

后来我发现我想错了，不能这样。我那样的方法并不是正确的答案。我把题目的例子稍微改了一下，就是本来是3的，改成4，如下图框框所示：

- 首先肯定看叶子节点，因为每个叶子节点的兄弟节点，如果值不一样，肯定要把小的调成大的
- 这样把最底层的全部调完，比如左下角的4号节点，权值2一定要调成3，右边的7号节点，权值1一定要调成4。
- 调完之后，叶子节点的父亲，我就可以把权值给改了，因为他儿子节点权值都是3，所以我直接调成5+3=8
- 这样同理，右下角的黑框，3号节点，权值2，现在变成2+4=6。
- 最后看1号节点，左边儿子权值8，右边6，只需要把6再加2，就可以变成左右权值一样！

![yuque_diagram](./day3-solution.jpg)

AC代码如下！

```cpp
class Solution {
public:

    int getResult(int rootNode, vector<int>& cost, int& result){
        if(rootNode >= cost.size() || rootNode < 0)
            return 0;
        int leftNode = rootNode * 2;
        int rightNode = rootNode * 2 + 1;

        if(leftNode < cost.size() && rightNode < cost.size()){
            int left = getResult(leftNode, cost, result);
            int right = getResult(rightNode, cost, result);

            int maxChild = max(left, right);
            result += abs(left - right);
            cost[rootNode] += maxChild;
        }
        return cost[rootNode];
    }

    int minIncrements(int n, vector<int>& cost) {
        vector<int> cost2;
        cost2.push_back(0);

        for(int i = 0; i < cost.size(); i++){
            cost2.push_back(cost[i]);
        }

        int result = 0;
        getResult(1, cost2, result);
        return result;
    }
};
```

浅说一下这题，例子没有给好，正好太特殊，底层全部变成3，就会给我一种错觉，所有的地方要把左右节点调整成一样的，实际上不是的，稍微举一反三就会找出正确的方法。

### 周四

Alice 有一棵 `n` 个节点的树，节点编号为 `0` 到 `n - 1` 。树用一个长度为 `n - 1` 的二维整数数组 `edges` 表示，其中 `edges[i] = [ai, bi]` ，表示树中节点 `ai` 和 `bi` 之间有一条边。

Alice 想要 Bob 找到这棵树的根。她允许 Bob 对这棵树进行若干次 **猜测** 。每一次猜测，Bob 做如下事情：

- 选择两个 **不相等** 的整数 `u` 和 `v` ，且树中必须存在边 `[u, v]` 。
- Bob 猜测树中 `u` 是 `v` 的 **父节点** 。

Bob 的猜测用二维整数数组 `guesses` 表示，其中 `guesses[j] = [uj, vj]` 表示 Bob 猜 `uj` 是 `vj` 的父节点。

Alice 非常懒，她不想逐个回答 Bob 的猜测，只告诉 Bob 这些猜测里面 **至少** 有 `k` 个猜测的结果为 `true` 。

给你二维整数数组 `edges` ，Bob 的所有猜测和整数 `k` ，请你返回可能成为树根的 **节点数目** 。如果没有这样的树，则返回 `0`。

这题目今天的我也没做出来，只能说参考了一下别人的思路然后自己写出来了。这个题目有涉及到下面的一些考点：

- 考点一：树的DFS（dfs这个我觉得得多写，不同的图的DFS还是略有区别，当然本质是递归）
  - 比如要在二维的一个地图里面，跑DFS，就需要标记那些节点已经走过了
  - 如果在一个树里面DFS，那就只**需要标记来源的节点**（然后走的时候，只要不是来的父亲节点，都可以走）。因为我们在保存树的时候，是会保存`A->B`，还有`B->A`两个信息的（比如这个题，当然要是那些父子节点分明的，那就不需要）
- 考点二：hash map。这个题目需要快速的查询guesses，需要知道一个边是否在guesses里面，所以需要一个哈希map。
  - 我个人写代码到时候习惯用二维数组，但是这个题目二维数组会超时！
  - map是基于红黑树实现，unordered_map是基于hash_table实现，把数据的存储和查找消耗的时间大大降低，几乎可以看成是常数时间。这个题目里面会用到大量的查询，如果直接用map肯定是会寄的！
- 难点三：假设X的儿子是Y，理解当X是根节点（猜对的数量是$a_x$），和翻转后Y是根节点（猜对的数量是$a_y$），猜对的数量是会怎么变？
  - 如果只存在`[X->Y]`的guess，不存在`[Y-X]`的guess，那么$a_y = a_x - 1$（翻转后原来的X-Y猜测X是根节点，所以要减1）
  - 如果只存在`[Y->X]`的guess，不存在`[X->Y]`的guess，那么$a_y = a_x + 1$​
  - 如果存在`[Y->X]`的guess，也存在`[X->Y]`的guess，那么$a_y = a_x$

```cpp
int N = 0;
int node0RootOknums  = 0;
map<int, map<int, bool>> hashGuesses;
unordered_set<long long> s;

// int [100005][100005];

class Solution {
private:
public:
    // 检查是否在猜测中
    bool ifExistInGuess(long long int startNode,long long  int endNode){
        // 之前我用的二维map，说实话降低了速度，看了题解后才优化
        // if(hashGuesses.count(startNode) == 0)
        //     return false;
        // map<int, bool> tmp = hashGuesses[startNode];
        // if(tmp.count(endNode) == 0)
        //     return false;
        // return hashGuesses[startNode][endNode];

        return s.count(startNode << 32 | endNode);
    }

    void insertIntoGuess(long long int startNode,long long int endNode){
        // hashGuesses[startNode][endNode] = 1;
        long long int llst = startNode;
        long long int llend = endNode;
        s.insert(startNode << 32 | endNode);
    }


    void dfs(int curNode, vector<vector<int>>& tree, int fromNode){
        vector<int> nextAvai = tree[curNode];
        for(int i = 0; i < nextAvai.size(); i++){
            // 避免走回去了，记录一个从哪里来！
            int nextNode = nextAvai[i];

            if(nextNode == fromNode){
                continue;
            }
            
            if(ifExistInGuess(curNode, nextNode)){
                node0RootOknums++;
            }
            dfs(nextNode, tree, curNode);   
        }
    }

    // 
    void dfsV2(int curNode, vector<vector<int>>& tree, vector<int>& nodeGuessOkNum,int fromNode){
        vector<int> nextAvai = tree[curNode];
        for(int i = 0; i < nextAvai.size(); i++){
            int nextNode = nextAvai[i];
            // 避免走回去了，记录一个从哪里来！
            if(nextNode == fromNode){
                continue;
            }

            // base应该基于当前的,之前我搞糊涂了
            nodeGuessOkNum[nextNode] =  nodeGuessOkNum[curNode];
            if(ifExistInGuess(curNode, nextNode)){
                nodeGuessOkNum[nextNode]--;
            }
            if(ifExistInGuess(nextNode, curNode)){
                nodeGuessOkNum[nextNode]++;
            }
            
            dfsV2(nextNode, tree, nodeGuessOkNum, curNode);
        }
    }
    
    int rootCount(vector<vector<int>>& edges, vector<vector<int>>& guesses, int k) {
        // N:节点的数量 
        N = edges.size() + 1;
        node0RootOknums = 0;
        hashGuesses.clear();
        s.clear();

        // 初始化用来反正
        vector<int> emptyVec;
        vector<vector<int>> Tree(N, emptyVec);
        // 怎么存这个树?
        for(int i = 0; i < edges.size(); i++){
            vector<int> edge = edges[i];
            int startNode = edge[0];
            int endNode = edge[1];
            Tree[startNode].push_back(endNode);
            // 记得要双向push不要只单向哦
            Tree[endNode].push_back(startNode);
        }

        // 然后还需要对于guesses处理，我习惯用map
        // 因为要加快查询
        for(int j = 0; j < guesses.size(); j++){
            vector<int> oneGuess = guesses[j];
            int startNode = oneGuess[0];
            int endNode = oneGuess[1];
            insertIntoGuess(startNode, endNode);
        }

        // 把树准备好之后，再开始dfs，从节点0开始dfs
        // 树的dfs不需要标记ifvisited，因为没有环路（！
        dfs(0, Tree, -1);
        // // 节点i如果是根节点，对应的猜对的次数

        vector<int> nodeGuessOkNum(N, node0RootOknums);
        
        // 再跑一次?
        dfsV2(0, Tree, nodeGuessOkNum, -1);

        int result = 0;
        for(int j = 0; j < nodeGuessOkNum.size(); j++){
            if(nodeGuessOkNum[j] >= k)
                result++;
        }

        return result;
    }
};
```



