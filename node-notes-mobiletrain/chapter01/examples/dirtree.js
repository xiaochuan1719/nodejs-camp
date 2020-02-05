const fs = require('fs');

fs.readdir('./', (err, dirs) => {
    if (err) throw err;
    for (let index = 0; index < dirs.length; index++) {
        console.log(dirs[index]);
        fs.stat(dirs[index], (err, stats) => {
            if (stats.isDirectory()) {
                fs.readdir(dirs[index], (err, dirs) => {
                    if (err) throw err;
                    for (let k = 0; k < dirs.length; k++) {
                        console.log(`\t` + dirs[k]);
                    }
                });
            }
        });
    };
});

// 问题：遍历子目录的时候不能跟随追加，和异步逻辑有关系；待优化
// 循环遍历的逻辑可以考虑是使用递归函数

