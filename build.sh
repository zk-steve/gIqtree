docker run --rm \
 --env ELECTRON_CACHE="/root/.cache/electron"  \
 --env ELECTRON_BUILDER_CACHE="/root/.cache/electron-builder" \
 -v ${PWD}:/project  \
 -v ${PWD##*/}-node_modules:/project/node_modules \
 -v ~/.cache/electron:/root/.cache/electron \
 -v ~/.cache/electron-builder:/root/.cache/electron-builder \
 electronuserland/builder:wine /bin/bash -c "node -v && yarn && yarn build && chmod -R 777 ./dist && rm -Rf ./build"
