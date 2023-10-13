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
    name: String,
    login: String,
    bio: String,
    followers: Number,
    following: Number,
    location: String,
    repo_url: String,
    site: String,
    avatar: String,
    repositorios: Number
  }
}
</script>

<template>
  <div class="card__wrapper">
    <img class="card__avatar" :src="avatar" alt="avatar"/>
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
        <span>{{ repositorios }}</span>
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
  gap: 1rem;
  display: flex;
  padding: 1rem 2rem;
  color: black;
  width: 32.5rem;
  height: 37.5rem;
  border-radius: 1.6rem;
  flex-direction: column;
  background-color: #0d1631;
  box-shadow: 0.1rem 0.2rem 0.8rem #000;
}

.card__avatar {
  width: 10rem;
  height: 10rem;
  margin: 0 auto;
  border-radius: 50%;
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
  width: 90%;
  max-height: 6rem;
  overflow: hidden;
  line-height: 1.4;
  word-break: break-word;
  color: rgb(240, 248, 255);
}

.card__profile-location svg {
  top: 0.2rem;
  width: 1.2rem;
  position: relative;
}

.card__infos {
  width: 100%;
  display: flex;
  padding: 0.5rem 2rem;
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
</style>
