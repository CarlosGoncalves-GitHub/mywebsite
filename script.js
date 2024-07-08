document.addEventListener('DOMContentLoaded', function() {
const chars = ".,-~:;=!*#$@"; // Characters for shading
        const R1 = 10;
        const R2 = 20;
        const K2 = 200;
        const theta_spacing = 10;
        const phi_spacing = 3;
        const screen_width = 80;
        const screen_height = 40;
        const screen_size = screen_width * screen_height;
        const K1 = screen_height * K2 * 3 / (8 * (R1 + R2));

        let A = 0;
        let B = 0;
        let hue = 0;
        let output = new Array(screen_size).fill(' ');
        let zbuffer = new Array(screen_size).fill(0);

        function hsv2rgb(h, s, v) {
            const rgb = colorsys.hsv_to_rgb(h, s, v);
            return rgb.map(c => Math.round(c * 255));
        }

        function updateDonut() {
            for (let theta = 0; theta < 628; theta += theta_spacing) {
                for (let phi = 0; phi < 628; phi += phi_spacing) {
                    const cosA = Math.cos(A);
                    const sinA = Math.sin(A);
                    const cosB = Math.cos(B);
                    const sinB = Math.sin(B);
                    const costheta = Math.cos(theta);
                    const sintheta = Math.sin(theta);
                    const cosphi = Math.cos(phi);
                    const sinphi = Math.sin(phi);
                    const circlex = R2 + R1 * costheta;
                    const circley = R1 * sintheta;
                    const x = circlex * (cosB * cosphi + sinA * sinB * sinphi) - circley * cosA * sinB;
                    const y = circlex * (sinB * cosphi - sinA * cosB * sinphi) + circley * cosA * cosB;
                    const z = K2 + cosA * circlex * sinphi + circley * sinA;
                    const ooz = 1 / z;
                    const xp = Math.round(screen_width / 2 + K1 * ooz * x);
                    const yp = Math.round(screen_height / 2 - K1 * ooz * y);
                    const position = xp + screen_width * yp;
                    const L = cosphi * costheta * sinB - cosA * costheta * sinphi - sinA * sintheta + cosB * (cosA * sintheta - costheta * sinA * sinphi);
                    if (ooz > zbuffer[position]) {
                        zbuffer[position] = ooz;
                        const luminance_index = Math.round(L * 8);
                        output[position] = chars[luminance_index > 0 ? luminance_index : 0];
                    }
                }
            }
            document.getElementById('ascii-donut').textContent = output.join('');
            A += 0.15;
            B += 0.035;
            hue += 0.005;
            setTimeout(updateDonut, 70); // Adjust the speed as needed
        }

        updateDonut()});