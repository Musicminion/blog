---
title: 算法汇总
tags: [算法, C++, Leetcode]
date: 2024-03-20 00:09:01
updated: 2024-03-20 00:09:01
index_img: 2024/03/common-algorithm/banner.png
banner_img: 2024/03/common-algorithm/banner.png
author: Musicminion
---


## 常用算法汇总

> 回想起大学学过的算法，可谓数不尽数。但是有些算法总是让我又爱又恨。比如KMP、再比如Dijkstra最短路径，这些算法其实都很精彩，奈何我**一学就忘**，每次忘记了都要花费大量的时间去看教程，比如知乎上面的各种算法。一看就是半天，所以我打算开一个帖子博文，专门记录那些「稍微有些复杂」、「不好理解容易忘记」、「经常会考到」的算法吧！

### KMP算法

> SE高级数据结构里面讲到的，核心在于`j = next[j]`

#### 1）KMP核心思想

```txt
index     0 1 2 3 4 5 6
目标串(ss) a b a b a b c
          | | | |
模式串(mm) a b a b c
```

如上图，匹配两个字符串`abababc`和`ababc`。定义：我们要在这个目标串(ss)里面找我们想要的模式串(mm)，建议记一下缩写（目标串ss，模式串mm），

先比较发现index 0-3的字母都一样，都是`abab`。index为4的时候就不一样了，这时候怎么办？我悄悄的把模式串往后移动**2位**，可以发现，除开被移走的部分，已经匹配的区域还是一样匹配。

```txt
index     0 1 2 3 4 5 6
目标串(ss) a b a b a b c
              | |
模式串(mm)     a b a b c
```

进而我们发现后面的4-6的也一样，匹配成功。KMP的核心思想就是：**当发现不匹配的时候，向后挪动「模式串」若干位**，然后继续匹配，跑完为止。问题：

- 挪动多少位？
- 为什么挪动若干位之后还是一样？

两问题本质一致，原因很简单，对于模式串的`mm[0]-mm[3]`，也就是abab，从mm[0]往后数2两位，与mm[3]往前数两位一样，这就是为什么挪动**两位**，挪了还一样原因

```txt
模式串(mm)  a b a b c
              / /
             / /
            / /
           / /
模式串(mm) a b a b c
```

> 补充：有人说那我从mm[0]往后数4两位，与mm[3]往前数4位也一样，我这里规定：如果出现这种情况，以**最小**的为准！所以还是以2为准。我们记next[4] = 2。含义：
>
> - 4：mm串从0-3的字符串，记为str
> - 2：str从头部往后数2个的字符串str1，到str后部往前数2个str2，str1==str2。
> - 上面所述，如果比2小，比0大，不可能出现str1==str2

核心思想点到为止，再纠结自己拿笔画图、看其他资料。我只觉得如果死纠结只会让自己一天都沉迷在KMP怎么写的原理里面。（所以劝大家不要纠结）

#### 2）KMP算法

要写对KMP，只需要知道几个关键东西

- 首先要写对buildNext数组的过程
- 然后要写对匹配的原理

这里顺带提一嘴`buildNext`函数，记住两个：

- 目标串不带通配符，模式串带-1作为index的通配符
- `i`永远对应目标串，`j`永远对应模式串
- 优先判断：`j < 0`代表通配
- 错配时：`j = next[j]`
- 初始化：`next[i] = j`
- 匹配：先`ij`自增，再考虑`next[i] = j`

```c++
    vector<int> buildNext(string mm){
        //              i=0
        // 目标串：     mm[0]  mm[1]  mm[2]
        // 模式串： *   mm[0]  mm[1]  mm[2]
        //       j=-1
        int i = 0;
        int j = -1;
        int mmSize = mm.size();
        vector<int> next = vector(mm.size(), 0);
        next[i] = j;

        while(i + 1 < mmSize){
            if(j < 0 || mm[i] == mm[j]){
                i++; j++;
                next[i] = j;
            } else {
                j = next[j];
            }
        }
        return next;
    }
```

再来说KMP的算法

- 初始化时`i = j = 0`
- 错配`j = next[j]`
- 最终，如果j没有跑满，那就是不匹配，如果匹配，下标为`i-j`

```cpp
    // ss 搜索的范围 mm搜索的内容
    int KMP(string ss, string mm){
        int i = 0;
        int j = 0;
        int ssSize = ss.size();
        int mmSize = mm.size();
        vector<int> next = buildNext(mm);

        while(i < ssSize && j < mmSize){
            if(j < 0 || ss[i] == mm[j]){
                i++;j++;
            } else{
                j = next[j];
            }
        }

        int index  = i - j;
        if(j < (int)mm.size())
            return -1;
        return i - j;
    }
```







### Dijsktra算法

> Dijsktra是一个最短路径的算法。有两个版本的实现！我这里给出两个模版，都返回一个数组，代表从`src`出发，到所有节点的最短距离。

#### 版本一：

> 版本一比较好理解，推荐记忆这个！

我这里只用最简单的语言描述这个算法，具体证明感兴趣者研究。算法步骤：

- $graph[i][j]$表示从 $i \rightarrow j$ 的距离，地图数据，$src$ 代表出发的节点编号
- 维护一个`dist`数组，记录`src`出发到各个节点的距离，初始化`inf`表示无穷远
- 维护一个`used`数组，记录是否曾经到过这里，初始化`false`，全部没有走过
- 从出发点到出发点距离显然是 $0$，所以`dist[src] = 0`
- 遍历$n$次($n$ 是节点的数量)：
  - 每次在`dist`数组里面找到`dist`数组里面，**之前没走过的**，且值最小的下标 $x$：即当前距离`src`最小的节点是 $x$
  - 找到后标记$used[x] = true$，这个节点已经走过啦！
  - 考虑从 $x$ 节点出发可以到达的地方，用 $y$ 遍历并更新 $dist[]$ 数组，$dist[y] = min(dist[y], dist[x] + graph[x][y])$ 
  - （解释：从 $src \rightarrow y$ 的最短路径，如果发现路过 $src \rightarrow x \rightarrow y$ 更短，就更新）

```cpp
    // 说实话这是个模版题目，竞赛的技巧性很强，写代码的时候很多时候简介为主
    // 所以看的很容易看不明白
    // graph 二维数组; src 出发节点; return dist数组(表示src到各个节点最短距离)
    vector<int> dijkstra_v1(vector<vector<int>>& graph, int src) {
        // inf: 不能到达，就用inf表示
        // - 为什么不用INT_MAX? 因为后面加法可能越界，如果爆炸自行改long long
        // - 为什么不用 -1 不想后面给你增加额外的debug时间
        const int inf = INT_MAX / 2;
        // n: 节点的数量
        const int n = graph.size();
        // dist数组(表示src到各个节点最短距离)
        vector<int> dist(n, inf);
        // 初始化的时候 src地方为0
        dist[src] = 0;
        // 走过的节点
        vector<bool> used(n, false);
        
        // 刚开始，默认所有的节点都没有走过
        // 遍历n次，每次找到dist数组里面，没走过的，距离最小的
        for (int i = 0; i < n; ++i) {
            int x = -1;
            // 让x指向dist数组里面(没有走过的!used)、并且最小的
            for (int y = 0; y < n; ++y) {
                // 技巧性有点强，x == -1 是为了妥协，一旦找到一个!used,立马赋值
                // 后面的是为了严格要求，如果发现更小的，及时更新x的值
                // 这么写说实话我都想打人，写的是啥可读性太差
                if (!used[y] && (x == -1 || dist[y] < dist[x])) {
                    x = y;
                }
            }

            // 有人可能会怀疑这个x会不会是-1啊
            // 不可能，最外层for循环n次，每次标记一个used[x] = true
            // 所以肯定不会-1
            // cout << x << endl;
            used[x] = true;
            
            // 遍历dist数组，然后更新所有能够通过x到达的节点y，对应的dist[y]
            for (int y = 0; y < n; ++y) {
                dist[y] = min(dist[y], dist[x] + graph[x][y]);
            }
        }
        return dist;
    }
```

#### 版本二：

> 第二个版本是用的优先级队列实现的。因为前面我每次都要遍历一次数组，才能找到数组 $dist[x]$ 中值最小的：即**之前没走过的**，且 $dist[x]$ 值最小的下标 $x$。
>
> 所以我可以用一个`pair<int, int>`的优先级队列存储，pair的第一个元素是节点 $i$ 的 $dist$ 距离，第二个元素是节点的下标 $i$ 。

```cpp
    vector<int> dijkstra_v2(vector<vector<int>>& graph, int src) {
        // inf: 不能到达，就用inf表示
        const int inf = INT_MAX / 2;
        // n:节点的数量
        const int n = graph.size();
        // dist数组
        vector<int> dist(n, inf);
        // 初始化的时候 src地方为0
        dist[src] = 0;

        // 之前我们用used表示走过的节点，现在我们用优先级队列，走过出队，所以不需要
        // vector<bool> used(n, false);
        // q表示走过的节点的队列
        // pair的第一个元素 i 是: 从src到j，最短的距离
        // pair的第二个元素 j 是: 节点的编号(0-base)
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> q;
        
        // 从src到src，距离为0，显然
        q.push({0, src});


        // 遍历n次，每次找到dist数组里面，没走过的，距离最小的
        while (!q.empty()) {
            auto p = q.top();
            q.pop();
            
            // 拿出队列里面，最近的一个可以到达的节点
            int distance = p.first; 
            int curNodeID = p.second;

            // 如果发现拿出来的节点，反而比已经记录的最短路径还长
            // 丢弃，不用走了，已经走过了
            if(dist[curNodeID] < distance){
                continue;
            }

            for(int next = 0; next < graph[curNodeID].size(); next++){
                // i表示可以走的下一个
                if(graph[curNodeID][next] == inf)
                    continue;
                
                // dist[next] = min(dist[next], dist[curNodeID] + graph[curNodeID][next]);
                int newDistance = dist[curNodeID] + graph[curNodeID][next];
                if(newDistance < dist[next]){
                    dist[next] = newDistance;
                    q.push({newDistance, next});
                }
            }
        }
        // 后面方法一中的遍历这些，显然就不需要啦
        return dist;
    }
```





