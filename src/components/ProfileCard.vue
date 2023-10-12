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
    <img class="card__avatar" :src="avatar" />
    <div class="card__profile">
      <p class="card__profile-name">{{ name }}</p>
      <p class="card__profile-login">{{ login }}</p>
      <p class="card__profile-bio">{{ bio }}</p>
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
  gap: 0.5rem;
  display: flex;
  color: black;
  width: 32.5rem;
  height: 37.5rem;
  align-items: center;
  padding: 1rem 2.5rem;
  border-radius: 1.6rem;
  flex-direction: column;
  background-color: #0d1631;
}

.card__avatar {
  width: 10rem;
  height: 10rem;
  margin: 0 auto;
  border-radius: 50%;
}

.card__profile {
  width: 90%;
  display: flex;
  text-align: left;
  line-height: 1.6;
  color: #79828c;
  font-size: 1.4rem;
  flex-direction: column;
  text-overflow: ellipsis;
}

.card__profile-name {
  font-weight: bold;
  color: rgb(240, 248, 255);
}

.card__profile-name,
.card__profile-login {
  text-align: center;
}

.card__profile-bio {
  width: 100%;
  overflow: hidden;
  margin-top: 0.5rem;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.card__profile-location svg {
  top: 0.2rem;
  width: 1.2rem;
  position: relative;
}

.card__infos {
  width: 100%;
  display: flex;
  margin: 0.5rem 0;
  padding: 1rem 2rem;
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
  font-size: 1.8rem;
  font-weight: bold;
}

.card__link,a {
  width: 100%;
  display: flex;
  height: 3.4rem;
  flex-shrink: 0;
  cursor: pointer;
  align-items: center;
  border-radius: 0.8rem;
  text-decoration: none;
  justify-content: center;
}

/* a {
  font-size: 1.4rem;
  color: rgb(240, 248, 255);
} */
</style>
