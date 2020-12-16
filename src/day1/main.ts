import fs from 'fs';
import path from 'path';
const input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), 'utf-8');
const arr = input.split('\n');
const arrN = arr.map((s) => parseInt(s));
const TARGET = 2020;
const NS_PER_SEC = 1e9;

const dpMethod: (arr: number[]) => number = (arr: number[]) => {
    arr = arr.sort((a, b) => a-b);
    let lhs = 0;
    let rhs = arr.length - 1;
    while (lhs < rhs) {
        let sum = arr[lhs] + arr[rhs];
        if (sum === TARGET) {
            return arr[lhs] * arr[rhs];
        } else if (sum < TARGET) {
            lhs++;
        } else {
            rhs--;
        }
    }
    return -1;
};

const bruteForce: (arr: number[]) => number = (arr: number[]) => {
    arr = arr.sort((a, b) => a-b);
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] + arr[j] === TARGET) {
                return arr[i] * arr[j];
            }
        }
    }
    return -1;
};

const bruteForce3: (arr: number[]) => number = (arr: number[]) => {
    arr = arr.sort((a, b) => a-b);

    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            for (let k = j + 1; k < arr.length; k++) {
                if (arr[i] + arr[j] + arr[k] === TARGET) {
                    return arr[i] * arr[j] * arr[k];
                }
            }
        }
    }

    return -1;
};

const hmMethod3: (arr: number[]) => number = (arr: number[]) => {
    arr = arr.sort((a,b) => a-b);

    for (let i = 0; i < arr.length; i++) {
        let currTarget = TARGET - arr[i];
        const set = new Set<number>();
        for (let j = i + 1; j < arr.length; j++) {
            if (set.has(currTarget - arr[j])) {
                return arr[i] * arr[j] * (currTarget - arr[j]);
            } else {
                set.add(arr[j]);
            }
        }
    }

    return -1;
};

/* Bootstrap here */
const bfArr = [...arrN];
const dpArr = [...arrN];
console.log("************** 2-SUM Problem ****************");

const bfTime = process.hrtime();
console.log(`Brute Force Method Found: ${bruteForce(bfArr)}`);
const diffBF = process.hrtime(bfTime);
const bfMS = (diffBF[0] * NS_PER_SEC + diffBF[1])/1000000;
console.log(`Brute force took ${bfMS} ms -- O(n^2)`);

console.log("\n*********************************************");


const dpTime = process.hrtime();
console.log(`Dynamic Programming Method Found: ${dpMethod(dpArr)}`);
const diffDP = process.hrtime(dpTime);
const dpMS = (diffDP[0] * NS_PER_SEC + diffDP[1])/1000000;
console.log(`Dynamic programming method took ${dpMS} ms -- O(nlogn)`);

console.log(`Dynamic programming method was ${bfMS/dpMS}x faster!`);

console.log("\n************** 3-SUM Problem ****************");

const bf3Arr = [...arrN];
const dp3Arr = [...arrN];

const bf3time = process.hrtime();
console.log(`Brute Force Method Found: ${bruteForce3(bf3Arr)}`);
const diffBF3 = process.hrtime(bf3time);
const bf3MS = (diffBF3[0] * NS_PER_SEC + diffBF3[1])/1000000;
console.log(`Brute force took ${bf3MS} ms -- O(n^3)`);

console.log("\n*********************************************");

const dp3time = process.hrtime();
console.log(`HashMap method Found: ${hmMethod3(dp3Arr)}`);
const diffDP3 = process.hrtime(dp3time);
const dp3MS = (diffDP3[0] * NS_PER_SEC + diffDP3[1])/1000000;
console.log(`HashMap method took ${dp3MS} ms -- O(n^2)`);

console.log(`HashMap method was ${bf3MS/dp3MS}x faster!`);

console.log("\n*********************************************");
