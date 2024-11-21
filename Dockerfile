# Używamy obrazu bazowego Node.js
FROM node:18-alpine as build

# Tworzymy katalog roboczy
WORKDIR /app

# Kopiujemy pliki aplikacji
COPY . .

# Instalujemy zależności i budujemy aplikację
RUN npm install && npm run build --prod

# Używamy lekkiego serwera do uruchomienia aplikacji (np. Nginx)
FROM nginx:alpine
COPY --from=build /app/dist/ /usr/share/nginx/html
