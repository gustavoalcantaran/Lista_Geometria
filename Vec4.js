class Vec4 {
    constructor(x = 0, y = 0, z = 0, w = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    norm(){
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    multiplyScalar(s) {
        return new Vec4(this.x * s, this.y * s, this.z * s, this.w * s);
    }

    sum(v){
        return new Vec4(this.x + v.x, this.y + v.y, this.z + v.z, this.w + v.w);
    }

    creationFromPoints(p1, p2) {
        return new Vec4(p2.x - p1.x, p2.y - p1.y, p2.z - p1.z, 0);
    }

    normalize(){
        const length = this.norm();
        if (length === 0) {
            return new Vec4(0, 0, 0, this.w);
        }
        return new Vec4(this.x / length, this.y / length, this.z / length, this.w);
    }

    dot(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
    }

    cross(v2){
        return new Vec4(
            this.y * v2.z - this.z * v2.y,
            this.z * v2.x - this.x * v2.z,
            this.x * v2.y - this.y * v2.x,
            0
        );
    }

    angleTo(v2){
        const dotProduct = this.dot(this, v2);
        const normsProduct = this.norm() * v2.norm();
        if (normsProduct === 0) return 0;
        const cosTheta = dotProduct / normsProduct;
        return Math.acos(Math.min(Math.max(cosTheta, -1), 1));
    }

    affineCombination(v2, t) {
        return new Vec4(
            this.x * (1 - t) + v2.x * t,
            this.y * (1 - t) + v2.y * t,
            this.z * (1 - t) + v2.z * t,
            this.w * (1 - t) + v2.w * t
        );
    }
}

