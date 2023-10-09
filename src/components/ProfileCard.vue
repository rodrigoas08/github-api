<script lang="ts">
import IconLocation from '../components/icons/IconLocalization.vue'

export default {
  name: 'ProfileCard',
  components: {
    IconLocation
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
  },
  methods: {
    openLink(link: string) {
      window.open(link, '_blank', 'noopener,noreferrer')
    }
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
    <div class="card__links">
      <button @click="openLink(repo_url)">
        <a>Acessar repositórios</a>
      </button>
    </div>
  </div>
</template>

<style scoped>
.card__wrapper {
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  align-items: center;
  width: 32.5rem;
  height: 37.5rem;
  background-color: #0d1631;
  border-radius: 1.6rem;
  color: black;
  padding: 1rem;
}

.card__avatar {
  margin: 0 auto;
  border-radius: 50%;
  width: 10rem;
  height: 10rem;
}

.card__profile {
  display: flex;
  flex-direction: column;
  text-align: left;
  color: #79828c;
  font-size: 1.4rem;
  width: 90%;
  line-height: 1.6;
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
  margin-top: 0.5rem;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card__profile-location svg {
  width: 1.2rem;
  position: relative;
  top: 0.2rem;
}

.card__infos {
  display: flex;
  width: 90%;
  background-color: #0d1322;
  justify-content: space-between;
  border-radius: 0.8rem;
  padding: 1rem 2rem;
  margin: 0.5rem 0;
}

.card__infos-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: rgb(240, 248, 255);
  font-size: 1.2rem;
}

.card__infos-item > span {
  font-size: 1.8rem;
  font-weight: bold;
}

.card__links > button {
  width: 265px;
  height: 34px;
  flex-shrink: 0;
  border-radius: 7px;
  background-color: #21262d;
  border: none;
  cursor: pointer;
  color: rgb(240, 248, 255);
}

h2 {
  font-size: 1.8rem;
  margin-top: 1rem;
  color: rgb(255, 255, 255);
}
</style>
