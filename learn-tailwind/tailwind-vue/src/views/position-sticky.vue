<template>
  <div class="h-screen p-10 bg-green-100">
    <div class="h-full overflow-y-scroll">
      <div>
        <div class="heading">Sticky Heading 1</div>
        <p>
          Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at
          interdum magna augue eget diam. Vestibulum ante ipsum primis in
          faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia
          molestie dui. Praesent blandit dolor. Sed non quam. In vel mi sit amet
          augue congue elementum. Morbi in ipsum sit amet pede facilisis
          laoreet. Donec lacus nunc, viverra nec, blandit vel, egestas et,
          augue. Vestibulum tincidunt malesuada tellus. Ut ultrices ultrices
          enim. Curabitur sit amet mauris. Morbi in dui quis est pulvinar
          ullamcorper. Nulla facilisi.
        </p>
      </div>

      <div>
        <div class="heading">Sticky Heading 2</div>
        <p>
          Integer lacinia sollicitudin massa. Cras metus. Sed aliquet risus a
          tortor. Integer id quam. Morbi mi. Quisque nisl felis, venenatis
          tristique, dignissim in, ultrices sit amet, augue. Proin sodales
          libero eget ante. Nulla quam. Aenean laoreet. Vestibulum nisi lectus,
          commodo ac, facilisis ac, ultricies eu, pede. Ut orci risus, accumsan
          porttitor, cursus quis, aliquet eget, justo. Sed pretium blandit orci.
          Ut eu diam at pede suscipit sodales. Aenean lectus elit, fermentum
          non, convallis id, sagittis at, neque.
        </p>
      </div>

      <div>
        <div class="heading">Sticky Heading 3</div>
        <p>
          Nullam mauris orci, aliquet et, iaculis et, viverra vitae, ligula.
          Nulla ut felis in purus aliquam imperdiet. Maecenas aliquet mollis
          lectus. Vivamus consectetuer risus et tortor. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
          Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh
          elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec
          tellus sed augue semper porta. Mauris massa.
        </p>
      </div>

      <div>
        <div class="heading">Sticky Heading 4</div>
        <p>
          Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at
          interdum magna augue eget diam. Vestibulum ante ipsum primis in
          faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia
          molestie dui. Praesent blandit dolor. Sed non quam. In vel mi sit amet
          augue congue elementum. Morbi in ipsum sit amet pede facilisis
          laoreet. Donec lacus nunc, viverra nec, blandit vel, egestas et,
          augue. Vestibulum tincidunt malesuada tellus. Ut ultrices ultrices
          enim. Curabitur sit amet mauris. Morbi in dui quis est pulvinar
          ullamcorper. Nulla facilisi.
        </p>
      </div>

      <div>
        <div class="heading">Sticky Heading 5</div>
        <p>
          Integer lacinia sollicitudin massa. Cras metus. Sed aliquet risus a
          tortor. Integer id quam. Morbi mi. Quisque nisl felis, venenatis
          tristique, dignissim in, ultrices sit amet, augue. Proin sodales
          libero eget ante. Nulla quam. Aenean laoreet. Vestibulum nisi lectus,
          commodo ac, facilisis ac, ultricies eu, pede. Ut orci risus, accumsan
          porttitor, cursus quis, aliquet eget, justo. Sed pretium blandit orci.
          Ut eu diam at pede suscipit sodales. Aenean lectus elit, fermentum
          non, convallis id, sagittis at, neque.
        </p>
      </div>

      <div>
        <div class="heading">Sticky Heading 6</div>
        <p>
          Nullam mauris orci, aliquet et, iaculis et, viverra vitae, ligula.
          Nulla ut felis in purus aliquam imperdiet. Maecenas aliquet mollis
          lectus. Vivamus consectetuer risus et tortor. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
          Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh
          elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec
          tellus sed augue semper porta. Mauris massa.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.heading {
  @apply p-2;
  @apply sticky top-0;
  @apply bg-green-300;
  @apply rounded-md;
  @apply text-lg font-bold text-green-700;
}

p {
  @apply py-4;
  @apply text-lg font-medium text-green-600;
}
</style>
