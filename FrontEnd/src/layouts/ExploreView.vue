<template>
  <div>
    <nav
      class="navbar sticky top-0 left-0 bg-white p-4 flex flex-row items-center justify-between border-b"
    >
      <router-link to="/explore" class="text-lg font-extrabold">Book Store</router-link>

      <div class="search">
        <input
          type="text"
          placeholder="Search..."
          class="outline-none border rounded-md px-6 py-3"
        />
      </div>

      <div class="links space-x-6">
        <router-link class="text-3xl" to="#!"
          ><ion-icon name="cart-outline"></ion-icon
        ></router-link>
        <router-link class="text-3xl" to="/explore/account">
          <ion-icon name="person-outline"></ion-icon>
        </router-link>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
ion-icon {
  --ionicon-stroke-width: 36px;
}

div.goi_y {
  .tips {
  display: flex;
  align-items: center;
}
}

h3 {
  border: 1px solid rgb(11, 126, 233);
}

img {
  display: inline-block;
  width: 200px;
  height: 200px;
}
</style>
