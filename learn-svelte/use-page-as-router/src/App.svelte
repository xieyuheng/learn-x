<script>
  import page from "page"
  import Home from "./Home.svelte"
  import About from "./About.svelte"

  let main

  const use = (component) => {
    main = component
  }

  page("/", () => use(Home))
  page("/about", () => use(About))

  page.start()
</script>

<svelte:component this={main} />
