<script lang="ts">
import IconLocation from '../components/icons/IconLocalization.vue'
import BaseButton from '../components/BaseButton.vue'

export default {
  name: 'ProfileCard',
  components: {
    IconLocation,
    BaseButton
  },
  props: {
    name: { type: String, default: '' },
    login: { type: String, default: '' },
    bio: { type: String, default: '' },
    followers: { type: Number, default: null },
    following: { type: Number, default: null },
    location: { type: String, default: '' },
    avatar: { type: String, default: '' },
    repositories: { type: Number, default: null }
  }
}
</script>

<template>
  <div class="card__wrapper">
    <img class="card__avatar" :src="avatar" alt="avatar" />
    <div class="card__profile">
      <div>
        <p class="card__profile-name">{{ name }}</p>
        <p class="card__profile-login">{{ login }}</p>
      </div>
      <p class="card__profile-bio" :title="bio">{{ bio }}</p>
      <p class="card__profile-location">
        <IconLocation />
        {{ location }}
      </p>
    </div>
    <div class="card__infos">
      <div class="card__infos-item">
        <p>Seguindo</p>
        <span>{{ following }}</span>
      </div>
      <div class="card__infos-item">
        <p>Seguidores</p>
        <span>{{ followers }}</span>
      </div>
      <div class="card__infos-item">
        <p>Repositórios</p>
        <span>{{ repositories }}</span>
      </div>
    </div>
    <div class="card__link">
      <router-link :to="{ name: 'repos' }">
        <BaseButton text="Listar repositórios"></BaseButton>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.card__wrapper {
  gap: 1.5rem;
  width: 80vw;
  height: auto;
  display: flex;
  color: black;
  padding: 2.4rem;
  border-radius: 0.8rem;
  flex-direction: column;
  background-color: #0d1631;
  box-shadow: 0.1rem 0.2rem 0.8rem #000;
}

.card__avatar {
  width: 7rem;
  height: 7rem;
  margin: 0 auto;
  border-radius: 50%;
  box-shadow: 0.1rem 0.1rem 0.9rem #000;
}

.card__profile {
  width: 100%;
  gap: 0.5rem;
  display: flex;
  text-align: left;
  color: #79828c;
  font-size: 1.4rem;
  flex-direction: column;
}

.card__profile-name {
  font-weight: bold;
  font-size: 1.6rem;
  color: rgb(240, 248, 255);
}

.card__profile-bio {
  color: rgb(240, 248, 255);
  font-size: 1.4rem;
}

.card__profile-location svg {
  top: 0.2rem;
  width: 1.2rem;
  position: relative;
}

.card__infos {
  width: 100%;
  display: flex;
  padding: 0.5rem 1rem;
  border-radius: 0.8rem;
  background-color: #0d1322;
  justify-content: space-between;
}

.card__infos-item {
  display: flex;
  font-size: 1.2rem;
  align-items: center;
  flex-direction: column;
  color: rgb(240, 248, 255);
}

.card__infos-item > span {
  font-size: 1.4rem;
  font-weight: bold;
}

.card__link,
a {
  width: 100%;
  height: 3.4rem;
  flex-shrink: 0;
  cursor: pointer;
  border-radius: 0.8rem;
  text-decoration: none;
}

@media only screen and (min-width: 768px) {
  .card__wrapper {
    max-width: 37.5rem;
    min-height: 40rem;
  }

  .card__avatar {
    width: 10rem;
    height: 10rem;
  }

  .card__profile-bio {
    width: 100%;
    margin: 1rem 0;
    font-size: 1.6rem;
  }

  .card__infos {
    padding: 0.5rem 0;
    justify-content: space-around;
  }
}
</style>
