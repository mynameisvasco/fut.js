export class Util {
    static calculateBaseId(resourceId) {
        let baseId = resourceId + 3288334336;
        let version = 0;
        while (baseId > 16777216) {
            version++;
            if (version === 1) {
                baseId -= 1342177280;
            }
            else if (version === 2) {
                baseId -= 50331648;
            }
            else {
                baseId -= 16777216;
            }
        }
        return baseId;
    }
    static formatPrice(price) {
        if (price === 150)
            return 150;
        else if (price <= 200)
            return 200;
        else if (price <= 950)
            return Math.ceil(price / 50) * 50;
        else if (price <= 9900)
            return Math.ceil(price / 100) * 100;
        else if (price >= 10000 && price <= 49750)
            return Math.ceil(price / 250) * 250;
        else if (price >= 50000 && price <= 100000)
            return Math.ceil(price / 500) * 500;
        else
            return Math.ceil(price / 1000) * 1000;
    }
    static decreasePrice(price) {
        if (price < 150) {
            return 150;
        }
        if (price - 50 < 1000) {
            return Util.formatPrice(price - 50);
        }
        if (price - 100 < 10000) {
            return Util.formatPrice(price - 100);
        }
        if (price - 250 < 50000) {
            return Util.formatPrice(price - 250);
        }
        return price - 500 < 100000 ? Util.formatPrice(price - 500) : Util.formatPrice(price - 1000);
    }
    static increasePrice(price) {
        if (price < 150) {
            return 150;
        }
        if (price + 50 < 1000) {
            return Util.formatPrice(price + 50);
        }
        if (price + 100 < 10000) {
            return Util.formatPrice(price + 100);
        }
        if (price + 250 < 50000) {
            return Util.formatPrice(price + 250);
        }
        return price + 500 < 100000 ? Util.formatPrice(price + 500) : Util.formatPrice(price + 1000);
    }
    static getRandomBidPrice(minPrice) {
        let list = [];
        let current = 0;
        while (current < minPrice) {
            list.push(current);
            current = Util.increasePrice(current);
        }
        let index = Math.floor(Math.random() * list.length);
        return list[index];
    }
    static getRandomBinPrice(minPrice, maxPrice) {
        let list = [];
        let current = minPrice;
        while (current < maxPrice) {
            list.push(current);
            current = Util.increasePrice(current);
        }
        return list[Math.floor(Math.random() * list.length)];
    }
}
