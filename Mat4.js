class Mat4{
    constructor(){
        this.elements = new Float32Array(16);
    }
    
    identity(){
        this.elements.fill(0);
        this.elements[0] = 1;
        this.elements[5] = 1;
        this.elements[10] = 1;
        this.elements[15] = 1;
    }

    translate(tx,ty,tz){
        this.elements[3] = tx;
        this.elements[7] = ty;
        this.elements[11] = tz;
    }

    rotateZ(angle){
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        this.elements.fill(0);
        this.elements[0] = c; this.elements[1] = -s;
        this.elements[4] = s; this.elements[5] =  c; this.elements[10] = 1;
        this.elements[15] = 1;
    }

    rotateY(angle){
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        this.elements.fill(0);
        this.elements[0] = c; this.elements[2] = s;
        this.elements[5] = 1;
        this.elements[8] = -s; this.elements[10] = c;
        this.elements[15] = 1;
    }

    rotateX(angle){
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        this.elements.fill(0);
        this.elements[0] = 1;
        this.elements[5] = c; this.elements[6] = -s;
        this.elements[9] = s; this.elements[10] = c;
        this.elements[15] = 1;
    }

    scale(sx,sy,sz){
        this.elements.fill(0);
        this.elements[0] = sx;
        this.elements[5] = sy;
        this.elements[10] = sz;
        this.elements[15] = 1;
    }

    multiply(m2){
        const result = new Mat4();
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                result.elements[i * 4 + j] =
                    this.elements[i * 4 + 0] * m2.elements[0 * 4 + j] +
                    this.elements[i * 4 + 1] * m2.elements[1 * 4 + j] +
                    this.elements[i * 4 + 2] * m2.elements[2 * 4 + j] +
                    this.elements[i * 4 + 3] * m2.elements[3 * 4 + j];
            }
        }
        return result;
    }

    ortho(left, right, bottom, top, near, far){
        const lr = 1 / (left - right);
        const bt = 1 / (bottom - top);
        const nf = 1 / (near - far);
        this.elements.fill(0);
        this.elements[0] = -2 * lr; this.elements[3] = (left + right) * lr;
        this.elements[5] = -2 * bt; this.elements[7] = (top + bottom) * bt;
        this.elements[10] = 2 * nf; this.elements[11] = (far + near) * nf;
        this.elements[15] = 1;
    }

    perspective(fov, aspect, near, far){
        const f = 1 / Math.tan(fov / 2);
        const nf = 1 / (near - far);
        this.elements.fill(0);
        this.elements[0] = f / aspect;
        this.elements[5] = f;
        this.elements[10] = (far + near) * nf; this.elements[11] = (2 * far * near) * nf;
        this.elements[14] = -1;
    }

    asFloat32Array(){
        return Array.from(this.elements);
    }
    
}