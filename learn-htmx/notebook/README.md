# notebook

```sh
pnpm install

scripts/dev.sh      # 开发：tailwind/node 监听
scripts/build.sh    # 构建 public/
scripts/start.sh    # 不监听，直接跑
scripts/check.sh    # tsc --noEmit
scripts/format.sh   # prettier
scripts/clean.sh    # 删除 public/ 下的产物
scripts/vendor.sh   # 把 htmx 复制到 public/vendor/
```
