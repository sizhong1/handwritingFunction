/**
 * 输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
 * 输出：[1,2,3,6,9,8,7,4,5]
 * 输入：matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
 * 输出：[1,2,3,4,8,12,11,10,9,5,6,7]
 */

function spiralOrder(matrix: number[][]): number[] {
    if (matrix.length === 0) return []
    let res: number[] = []
    let row = matrix.length
    let col = matrix[0].length
    let left = 0
    let right = col - 1
    let top = 0
    let bottom = row - 1
    while (left <= right && top <= bottom) {
        for (let i = left; i <= right; i++) {
            res.push(matrix[top][i])
        }
        for (let i = top + 1; i <= bottom; i++) {
            res.push(matrix[i][right])
        }
        if (left < right && top < bottom) {
            for (let i = right - 1; i > left; i--) {
                res.push(matrix[bottom][i])
            }
            for (let i = bottom; i > top; i--) {
                res.push(matrix[i][left])
            }
        }
        left++
        right--
        top++
        bottom--
    }
    return res
}

// console.log(spiralOrder([[1, 2, 3], [4, 5, 6], [7, 8, 9]]));




/**
 * 输入: root = [1,3,2,5,3,null,9]
 * 输出: [1,3,9]
 * 输入: root = [1,2,3]
 * 输出: [1,3]
 * 二叉树每层的最大值
 */
class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.left = (left === undefined ? null : left)
        this.right = (right === undefined ? null : right)
    }
}

function largestValues(root: TreeNode | null): number[] {
    if (!root) return []
    let res: number[] = []
    let queue: TreeNode[] = [root]
    while (queue.length) {
        let max = -Infinity
        let len = queue.length
        while (len--) {
            let node = queue.shift()!
            max = Math.max(max, node.val)
            node.left && queue.push(node.left)
            node.right && queue.push(node.right)
        }
        res.push(max)
    }
    return res
};

// console.log(largestValues(new TreeNode(1, new TreeNode(3, new TreeNode(5), new TreeNode(3)), new TreeNode(2, null, new TreeNode(9)))));


/**
 * 给你一个下标从 0 开始的整数数组 nums ，它表示英雄的能力值。如果我们选出一部分英雄，这组英雄的 力量 定义为：
i0 ，i1 ，... ik 表示这组英雄在数组中的下标。那么这组英雄的力量为 max(nums[i0],nums[i1] ... nums[ik])2 * min(nums[i0],nums[i1] ... nums[ik]) 。
请你返回所有可能的 非空 英雄组的 力量 之和。由于答案可能非常大，请你将结果对 109 + 7 取余。
 * 输入：nums = [2,1,4]
 * 输出：141
 * 输入：nums = [1,1,1]
 * 输出：7
 */

function sumOfPower(nums: number[]): number {
    nums.sort((a, b) => a - b);
    const mod = Math.pow(10, 9) + 7;
    let res = 0, prev = 0;
    for (let item of nums) {
        res = Number((BigInt(res) + BigInt(item) * BigInt(item) * BigInt(prev + item)) % BigInt(mod));
        prev = (prev * 2 + item) % mod
    }
    return res;
};

// 备份做法
function sumOfPowers(nums: number[]): number {
    const mod = 1e9 + 7;
    nums.sort((a, b) => a - b);
    let ans = 0;
    let p = 0;
    for (let i = nums.length - 1; i >= 0; --i) {
        const x = BigInt(nums[i]);
        ans = (ans + Number((x * x * x) % BigInt(mod))) % mod;
        ans = (ans + Number((x * BigInt(p)) % BigInt(mod))) % mod;
        p = Number((BigInt(p) * 2n + x * x) % BigInt(mod));
    }
    return ans;
}

// console.log(getArr([658, 489, 777, 2418, 1893, 130, 2448, 178, 1128, 2149, 1059, 1495, 1166, 608, 2006, 713, 1906, 2108, 680, 1348, 860, 1620, 146, 2447, 1895, 1083, 1465, 2351, 1359, 1187, 906, 533, 1943, 1814, 1808, 2065, 1744, 254, 1988, 1889, 1206]));
console.log(sumOfPower([2, 1, 4]));