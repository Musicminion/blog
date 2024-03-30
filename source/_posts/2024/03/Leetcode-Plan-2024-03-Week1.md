---
title: Leetcode计划：2024年三月第一周
tags: [Leetcode, 刷题]
date: 2024-03-06 18:59:00
updated: 2024-03-06 18:59:00
index_img: 2024/02/Leetcode-Plan-2024-02-Week4/打卡.png
banner_img: 2024/02/Leetcode-Plan-2024-02-Week4/打卡.png
author: Musicminion
---

## Leetcode计划：2024年三月第一周

> 由于本人寒假摸鱼，大四上学期一直在考研，寒假又在摸（原）鱼（神），所以曾经熟练的c++又变得生疏了起来，Leetcode是时候启动了！在不启动考研机考都要慌了！目前的计划是：
>
> 每天一题，如果很简单的，要求用c++和go两种语言写，如果是很难的可以只用c++写。

|   日期   |        周一        |        周二        |        周三        |        周四        |        周五        |             周六              |        周日        | 统计率 |
| :------: | :----------------: | :----------------: | :----------------: | :----------------: | :----------------: | :---------------------------: | :----------------: | :----: |
| 是否完成 | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :negative_squared_cross_mark: | :white_check_mark: |  6/7   |
| 独立完成 | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :negative_squared_cross_mark: | :white_check_mark: |  6/7   |
| 题目编号 |        232         |        1976        |        2917        |        2576        |        2834        |             2386              |        299         |        |

### 周一

请你仅使用两个栈实现先入先出队列。队列应当支持一般队列支持的所有操作（`push`、`pop`、`peek`、`empty`）：

实现 `MyQueue` 类：

- `void push(int x)` 将元素 x 推到队列的末尾
- `int pop()` 从队列的开头移除并返回元素
- `int peek()` 返回队列开头的元素
- `boolean empty()` 如果队列为空，返回 `true` ；否则，返回 `false`

**说明：**

- 你 **只能** 使用标准的栈操作 —— 也就是只有 `push to top`, `peek/pop from top`, `size`, 和 `is empty` 操作是合法的。
- 你所使用的语言也许不支持栈。你可以使用 list 或者 deque（双端队列）来模拟一个栈，只要是标准的栈操作即可。

**思路：**

这个题目正好回忆一下数据结构：

- 栈：可以类似一口井，往里面丢箱子，后入先出
- 队列：可以想象一群小学生在排队，先入先出

解答方法是：

- 将一个栈当作输入栈，用于压入 push 传入的数据；另一个栈当作输出栈，用于 pop 和 peek 操作。
- 每次 pop 或 peek 时，若输出栈为空则将输入栈的全部数据依次弹出并压入输出栈，这样输出栈从栈顶往栈底的顺序就是队列从队首往队尾的顺序。

### 周二

你在一个城市里，城市由 `n` 个路口组成，路口编号为 `0` 到 `n - 1` ，某些路口之间有 **双向** 道路。输入保证你可以从任意路口出发到达其他任意路口，且任意两个路口之间最多有一条路。

给你一个整数 `n` 和二维整数数组 `roads` ，其中 `roads[i] = [ui, vi, timei]` 表示在路口 `ui` 和 `vi` 之间有一条需要花费 `timei` 时间才能通过的道路。你想知道花费 **最少时间** 从路口 `0` 出发到达路口 `n - 1` 的方案数。

请返回花费 **最少时间** 到达目的地的 **路径数目** 。由于答案可能很大，将结果对 `1e9 + 7` **取余** 后返回。

周二的题目难度爆炸，首先说几个难度的地方：

- dijsk：最短路径算法
- dp：根据题目的意思，修改dijsk的算法，并完成dp
- long long int：题目里面数据非常大，所以所有的数据必须要用long long int存储，不然就会爆炸溢出

关于这个题目，我打算专门写一个dijsk算法的路径的小总结。所以这里就不过多的解析。

```cpp
long long int ans = 0;
long long int mod = 1e9 + 7;
class Solution {
public:
    vector<long long int> dijkstra_v2(vector<vector<long long int>>& graph, int src) {
        // inf: 不能到达，就用inf表示 (为什么不用INT_MAX? 因为后面加法可能越界)
        const long long int inf = LLONG_MAX / 2;
        // n:节点的数量
        const long long int n = graph.size();
        // dist数组
        vector<long long int> dist(n, inf);

        // 初始化存在的路径
        vector<long long int> ways(n, 0);


        // 初始化的时候 src地方为0
        dist[src] = 0;

        // 之前我们用used表示走过的节点，现在我们用优先级队列
        // vector<bool> used(n, false);

        // q表示走过的节点
        // pair的第一个元素 i 是: 从src到j，最短的距离
        // pair的第二个元素 j 是: 节点的编号(0-base)
        priority_queue<pair<long long int,long long int>, vector<pair<long long int, long long int>>, greater<>> q;
        
        // 从src到src，距离为0，显然
        q.push({0, src});
        ways[src] = 1;


        // 遍历n次，每次找到dist数组里面，没走过的，距离最小的
        while (!q.empty()) {
            auto p = q.top();
            q.pop();
            
            // 拿出队列里面，最近的一个可以到达的节点
            int distance = p.first; 
            int curNodeID = p.second;


            // 如果发现拿出来的节点，反而比已经记录的最短路径还长
            // 丢弃，不用走了，已经存在一个更短的路径
            if(dist[curNodeID] < distance){
                continue;
            }

            for(int next = 0; next < graph[curNodeID].size(); next++){
                // i表示可以走的下一个
                if(graph[curNodeID][next] == inf)
                    continue;
                
                // dist[next] = min(dist[next], dist[curNodeID] + graph[curNodeID][next]);
                long long int newDistance = dist[curNodeID] + graph[curNodeID][next];
                // cout << newDistance << " \n";
                if(newDistance < dist[next]){
                    dist[next] = newDistance;
                    // cout << "ways[curNodeID]1  " << curNodeID << " " << ways[curNodeID] << endl;
                    ways[next] = ways[curNodeID] ;
                    // cout << "update ways[next]1  " << next << " " << ways[next] << endl;
                    q.push({newDistance, next});
                } else if(newDistance == dist[next]){
                    // cout << "ways[curNodeID]2  " << curNodeID << " " << ways[curNodeID] << endl;
                    ways[next] = (ways[next] + ways[curNodeID]) % mod;
                    // cout << "update ways[next]2   " << next << " " << ways[next] << endl;
                }
            }
        }

        ans = ways[n - 1];

        // for(int i = 0; i < n; i++){
        //     cout << ways[i] << " ";
        // }
        // cout << endl;
        return dist;
    }

    int countPaths(int n, vector<vector<int>>& roads) {
        vector<vector<long long int>> mapData = vector(n, vector<long long int>(n, LLONG_MAX / 2));

        for (int i = 0; i < roads.size(); i++) {
            vector<int> curEdge = roads[i];
            long long int st = curEdge[0];
            long long int ed = curEdge[1];
            long long int len = curEdge[2];
            mapData[st][ed] = len;
            mapData[ed][st] = len;
        }


        dijkstra_v2(mapData, 0);
        return ans % (mod);
    }
};
```

### 周三

今天的题很简单，大意如下：

给你一个下标从 **0** 开始的整数数组 `nums` 和一个整数 `k` 。

`nums` 中的 **K-or** 是一个满足以下条件的非负整数：

- 只有在 `nums` 中，至少存在 `k` 个元素的第 `i` 位值为 1 ，那么 K-or 中的第 `i` 位的值才是 1 。

返回 `nums` 的 **K-or** 值。

**注意** ：对于整数 `x` ，如果 `(2i AND x) == 2i` ，则 `x` 中的第 `i` 位值为 1 ，其中 `AND` 为按位与运算符。

解答方法就是，对于给出来的nums数组，每个数组把他的各个bit位是1的，全部统计出来，放在一个`res[32]`的数组。（为什么是res32呢？因为这个nums里面全是int，int就是32位的，这是个小的知识点）

```c++
class Solution {
public:
    int findKOr(vector<int>& nums, int k) {
        // 统计第i位值为1的数字的个数
        int count[32] = {0};

        for(int i = 0; i < nums.size(); i++){
            int x = nums[i];
            for(int j = 0; pow(2, j) <= x; j++){
                int tmp = pow(2,j);
                count[j] += ((tmp & x) == tmp);
                

                // cout << x << " " << tmp << " " << endl;
            }
        }

        int res = 0;
        for(int i = 0; i < 32; i++){
            // cout << count[i] << " ";
            if(count[i] >= k)
                res += pow(2, i);
        }

        return res;
    }
};
```

### 周四

给你一个下标从 **0** 开始的字符串 `word` ，长度为 `n` ，由从 `0` 到 `9` 的数字组成。另给你一个正整数 `m` 。

`word` 的 **可整除数组** `div` 是一个长度为 `n` 的整数数组，并满足：

- 如果 `word[0,...,i]` 所表示的 **数值** 能被 `m` 整除，`div[i] = 1`
- 否则，`div[i] = 0`

返回 `word` 的可整除数组。

```cpp
class Solution {
public:
    vector<int> divisibilityArray(string word, int m) {
        int n = word.size();
        vector<int> div = vector(n, 0);
        // cout << "e\n";
        for(int i = 0; i < word.size(); i++){
            int curNum = word[i] - '0';
            //  cout << "f\n";
            if(i == 0 || div[i - 1] == 0){
                div[i] = curNum % m;
            }
            // 前一个不可以整除
            else if(div[i - 1] != 0){
                //  998 % 5 = 2
                // 9980 % 5 = 
                // 
                long long int last = div[i - 1];
                long long int tmp =  last * (10 % m) + curNum;
                div[i] = (tmp) % m;
            }
        }

        for(int i = 0; i < n; i++){
            if(div[i] > 0)
                div[i] = 0;
            else 
                div[i] = 1;
        }

        return div;
    }
};
```

### 周五

给你两个正整数：`n` 和 `target` 。

如果数组 `nums` 满足下述条件，则称其为 **美丽数组** 。

- `nums.length == n`.
- `nums` 由两两互不相同的正整数组成。
- 在范围 `[0, n-1]` 内，**不存在** 两个 **不同** 下标 `i` 和 `j` ，使得 `nums[i] + nums[j] == target` 。

返回符合条件的美丽数组所可能具备的 **最小** 和，并对结果进行取模 `109 + 7`。

```cpp
class Solution {
public:
    int minimumPossibleSum(int n, int target) {
        long long int lln = n;
        long long int llt = target;
        // 10 0000 0000
        long long int mod = 1e9 + 7;
        // n = 5 target = 4
        // [1, 2, 4, 5, 6]
        // x3  

        unsigned long long int mid = target / 2;

        if(n <= mid){
            // 1 2 3  ... n
            return (n * (n + 1) / 2) % mod;
        }

        else {
            // 1 2 3 ... mid  
            // target  target + 1 ... 
            return ((mid * (mid + 1) / 2) % mod + (llt + llt + lln - mid - 1) * (lln - mid) / 2 % mod ) % mod;
        }
    }
};
```

### 周六

给你一个整数数组 `nums` 和一个 **正** 整数 `k` 。你可以选择数组的任一 **子序列** 并且对其全部元素求和。

数组的 **第 k 大和** 定义为：可以获得的第 `k` 个 **最大** 子序列和（子序列和允许出现重复）

返回数组的 **第 k 大和** 。

子序列是一个可以由其他数组删除某些或不删除元素派生而来的数组，且派生过程不改变剩余元素的顺序。

**注意：**空子序列的和视作 `0` 。

```cpp
class Solution {
public:
    long long kSum(vector<int>& nums, int k) {
        long long mx = 0;
        int n = nums.size();
        for (int i = 0; i < n; ++i) {
            if (nums[i] > 0) {
                mx += nums[i];
            } else {
                nums[i] *= -1;
            }
        }
        sort(nums.begin(), nums.end());
        using pli = pair<long long, int>;
        priority_queue<pli, vector<pli>, greater<pli>> pq;
        pq.push({0, 0});
        while (--k) {
            auto p = pq.top();
            pq.pop();
            long long s = p.first;
            int i = p.second;
            if (i < n) {
                pq.push({s + nums[i], i + 1});
                if (i) {
                    pq.push({s + nums[i] - nums[i - 1], i + 1});
                }
            }
        }
        return mx - pq.top().first;
    }
};
```

### 周日

你在和朋友一起玩 [猜数字（Bulls and Cows）](https://baike.baidu.com/item/猜数字/83200?fromtitle=Bulls+and+Cows&fromid=12003488&fr=aladdin)游戏，该游戏规则如下：

写出一个秘密数字，并请朋友猜这个数字是多少。朋友每猜测一次，你就会给他一个包含下述信息的提示：

- 猜测数字中有多少位属于数字和确切位置都猜对了（称为 "Bulls"，公牛），
- 有多少位属于数字猜对了但是位置不对（称为 "Cows"，奶牛）。也就是说，这次猜测中有多少位非公牛数字可以通过重新排列转换成公牛数字。

给你一个秘密数字 `secret` 和朋友猜测的数字 `guess` ，请你返回对朋友这次猜测的提示。

提示的格式为 `"xAyB"` ，`x` 是公牛个数， `y` 是奶牛个数，`A` 表示公牛，`B` 表示奶牛。

请注意秘密数字和朋友猜测的数字都可能含有重复数字。

```cpp
class Solution {
public:
    string getHint(string secret, string guess) {
        int x = 0;
        int y = 0;
        map<char, int> sMap;
        map<char, int> gMap;
        map<char, int> sameMap;
        for(int i = 0; i < secret.size(); i++){
            if(secret[i] == guess[i]){
                x++;
                continue;
            }
            sMap[secret[i]]++;
            gMap[guess[i]]++;
        }

        
        for(auto iter = sMap.begin(); iter != sMap.end(); iter++){
            if(gMap.count(iter->first) == 1){
                y += min(iter->second, gMap[iter->first]);
            }
        }

        return to_string(x) + "A" + to_string(y) + "B";
    }
};
```

