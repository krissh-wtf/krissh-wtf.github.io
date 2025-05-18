#!/usr/bin/env sh

# pour apres quand j'aurais pas la flemme de finir la sections projets

url="https://api.github.com/users/krissh-wtf/repos"
dest="static/repos.json"

wget "$url" -O "$dest"
