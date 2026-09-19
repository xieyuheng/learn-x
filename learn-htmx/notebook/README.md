# notebook

htmx 4 练习项目：`node:http` + TypeScript + handlebars + Tailwind v4。

## 命令

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

## 结构

```
src/                服务器与 handlebars 封装
views/              *.hbs 模板
styles/app.css      tailwind 入口
public/             静态文件（app.css 与 vendor/ 是产物）
scripts/*.sh        所有入口
```
