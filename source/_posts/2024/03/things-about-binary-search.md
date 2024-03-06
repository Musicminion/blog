---
title: 二分查找的四种写法
tags: [二分查找, 算法, 软件开发, 面试经验, leetcode]
date: 2024-03-06 17:33:00
updated: 2024-03-06 17:33:00
index_img: 2024/03/things-about-binary-search/leetcode.png
banner_img: 2024/03/things-about-binary-search/leetcode.png
author: Musicminion
---

# mid加一还是减一？二分查找的灵魂拷问

> 本文章是我考研的时候，大概10月份时刷[Leetcode  704](https://leetcode.cn/problems/binary-search/)的时候思考写下来的文章，最近准备复试，就把文章复习了一下。放在我的博客里面。

![题目](./leetcode.png)

二分法人人感觉都能说上来，但是一写代码的时候经常会遇到各种debug。但凡没有深究过二分查找，然后写二分查找的题目的时候，都感觉很讨厌。因为总是有一些Corner Case考虑不到，最讨厌的就是到底是`+1`或者`-1`还是维持原来的不变，最大的问题莫非于下面的四个（假定数组`a[n]`是`0-base`）：

- 问题一：`high`是`n`还是`n-1`
- 问题二：判断完成后，high这里是mid-1还是mid
- 问题三：判断完成后，low 这里是mid+1还是mid
- 问题四：退出循环的时候是小于还是小于等于

下面的代码大部分的人都可以写出一个大概来，但是可能会有一些细节问题：

```c++
class Solution {
public:
    int search(vector<int>& nums, int target) {
        // 数组的长度是n
        int low = 0;
        int high = nums.size();         // 问题一：high是n还是n-1
        int mid;

        while(low < high){              // 问题四：这里是小于还是小于等于
            mid = (low + high) >> 1;    // 移位，就是除以2
            if(target < nums[mid])
                high = mid;             // 问题二：high这里是mid-1还是mid
            else if(target > nums[mid])
                low = mid + 1;          // 问题三：low 这里是mid+1还是mid
            else 
                return mid;
        }
        return -1;
    }
};
```

我们这样来理解，上面这一共有十六种组合，一一列举无论在面试还是考试，都是最低效的做法，也会给面试官极差的印象。我们确定一下前提，就可以获得答案。（先告诉你答案，只有两种组合是对的）

## 一、High是n-1的情况

> 首先，我们假定high是n-1的情况

- 先说循环的条件，如果数组只有一个元素，$low=high=0$，这时候如果`while(low < high)`，循环体都不会进去，直接返回不存在，所以不对，必须是`while(low <= high)`
- 然后再来说问题二、问题三里面的mid的问题：
  - 如果high、low都设置为mid，假设最终达到了`low==high`的条件，就会进入死循环，因为low永远突破不了high，high永远低于不了low
  - 如果high=mid-1，low=mid，假设最终达到了`low==high`的条件，且`target > nums[mid]`，也就是会进入下面代码的第二个if语句里面，那么还是死循环
  - 对称的，如果high=mid，low=mid+1，假设最终达到了`low==high`的条件，且`target < nums[mid]`，也就是会进入下面代码的第一个if语句里面，那么还是死循环
  - 所以只有一种，high=mid-1，low=mid+1

```c++
class Solution {
public:
    int search(vector<int>& nums, int target) {
        // 数组的长度是n
        int low = 0;
        int high = nums.size() - 1;     // 问题一：high是n还是n-1
        int mid;
			
        while(low <= high){             // 问题四：这里是小于还是小于等于
            mid = (low + high) >> 1;    // 移位，就是除以2
            if(target < nums[mid])
                high = mid - 1;         // 问题二：high这里是mid-1还是mid
            else if(target > nums[mid])
                low = mid + 1;          // 问题三：low 这里是mid+1还是mid
            else 
                return mid;
        }
        return -1;
    }
};

// 搜索的目标是[low, high] 所以high = n-1
```

换个角度理解，我们写的high、low是什么？无非是搜素的区间罢了！

- 在$[low,high]$里面搜索，区间非法的条件就是low>high，所以合法的前提对应：while里面是low<=high
- 在$[low,high]$里面搜索，target > nums[mid]，mid本身就可以排除了，所以low=mid+1
- 同理，high=mid-1的也是一样的道理！

## 二、High是n的情况

> 然后，我们假定high是n的情况

- 先来思考一下，我们的low和high是什么？
- 我们用二分法查找，low和high无非定义了一个区间，如果我们把low设置为0，high设置为n，而实际上有效的数组范围是$[0,n-1]$也就是$[0,n)$，这也和我们的$[low, high)$是一致的
- 那这个区间$[low, high)$非法的条件，或者说是空集的条件就是$low>=high$，所以while里面应该是$low < high$
- 所以`target < nums[mid]`的时候，high对应的是开括号，本身就是不可能，所以就是mid
- 所以`target > nums[mid]`的时候，mid本身已经是不可能了！low那里是闭区间，所以就是mid+1


```c++
class Solution {
public:
    int search(vector<int>& nums, int target) {
        // 数组的长度是n
        int low = 0;
        int high = nums.size();         // 问题一：high是n还是n-1
        int mid;

        while(low < high){              // 问题四：这里是小于还是小于等于
            mid = (low + high) >> 1;    // 移位，就是除以2
            if(target < nums[mid])
                high = mid;             // 问题二：high这里是mid-1还是mid
            else if(target > nums[mid])
                low = mid + 1;          // 问题三：low 这里是mid+1还是mid
            else 
                return mid;
        }
        return -1;
    }
};
// 目标是[low,high) low >= high的时候区间非法，所以是low < high的while里面
```

那这也就是这十六种组合里面的，二分法唯一的两个正确的解答。

## 三、延伸

上面介绍了两个区间，一个是$[low,high]$的写法，另外一种是$[low, high)$，于是…

那我可以写出这样的区间$(low,high)$的吗？

- 初始化的时候，要保证0到n-1都在这个区间里面，所以low=-1，high=n
- 区间合法的条件是，$low<high-1$：你可以想一想low如果和high相等或者low=high-1的时候，实际上都是空集！所以这个合法的条件要注意！
- target < nums[mid]或者target > nums[mid]时候，确保mid本身被排除，low或者high都是mid
- 看上去没问题，但是，low=1，high=2，无论是走第一个还是第二个if，这时候就死循环了
- 也就是说，如果出现两个if对应的分支里面，low和high的结果是完全一样的，那就会寄！

```c++
class Solution {
public:
    int search(vector<int>& nums, int target) {
        // 数组的长度是n
        int low = -1;
        int high = nums.size();         // 问题一：high是n还是n-1
        int mid;

        while(low < high - 1){          // 问题四：这里是小于还是小于等于
            mid = (low + high) >> 1;    // 移位，就是除以2
            if(target < nums[mid])
                high = mid;             // 问题二：high这里是mid-1还是mid
            else if(target > nums[mid])
                low = mid;              // 问题三：low 这里是mid+1还是mid
            else 
                return mid;
        }
        return -1;
    }
};
```

同样的道理$(low, high]$可以吗？可以，但是我要说一个地方就是：

- `mid = (low + high + 1) >> 1;`要这样计算！为什么呢？可以思考一下，为什么要向上取整
- 之前我们都说，`mid = (low + high) >> 1;`，可以发现`mid`一定在我们所给的区间里面，比如`[low,high)`或者`(low, high)`什么的，因为直接右移，等于向下取整，可以落在low的这个闭区间里面
- 但是！这里我们的区间是$(low, high]$，所以如果还是向下取整，会导致mid越界！总之我们要保证mid在我们规定的区间内，所以我们只能向上取整啦。

```c++
class Solution {
public:
    int search(vector<int>& nums, int target) {
        // 数组的长度是n
        int low = -1;
        int high = nums.size() - 1;         // 问题一：high是n还是n-1
        int mid;

        while(low < high){									// 问题四：这里是小于还是小于等于
            mid = (low + high + 1) >> 1;    // 移位，就是除以2
            if(target < nums[mid])
                high = mid - 1;             // 问题二：high这里是mid-1还是mid
            else if(target > nums[mid])
                low = mid;              		// 问题三：low 这里是mid+1还是mid
            else 
                return mid;
        }
        return -1;
    }
};
```

## 四、记忆法

如何记住二分法？如何快速写出来，我之类其实推荐几个要点，只要记住了就很好写：

- 首先，第一件事就是确定区间！本文介绍了四种区间，你只需要记住一种就好，挑最好记的！比如$[low, high]$
- 其次，初始化`low`和`high`的值，要保证这个区间，正好能覆盖这个数组！
- 然后，写出while里面的循环条件，条件的意义是：**要保证这个区间合法，区间内有整数！**
- 再次，确定low和high的值：
  - 如果对应的是闭区间，那就要写-1或者+1
  - 如果对应的是开区间，无脑写上=mid
- mid的值：绝大多数情况都是(low+high)/2，我不相信有人会故意给自己挖坑记忆最难的第四个

