class GeoSVG {
    constructor(containerId, width, height) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Container with id '${containerId}' not found.`);
            return;
        }
        this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.svg.setAttribute("width", width || "100%");
        this.svg.setAttribute("height", height || "100%");
        // Add basic style to handle SVG properly
        this.svg.style.overflow = 'hidden';
        this.container.appendChild(this.svg);
    }

    _applyOptions(element, options) {
        if (!options) return;

        // Colors and styles
        if (options.stroke) element.setAttribute("stroke", options.stroke);
        if (options.fill) element.setAttribute("fill", options.fill);
        if (options.strokeWidth) element.setAttribute("stroke-width", options.strokeWidth);
        if (options.fillOpacity) element.setAttribute("fill-opacity", options.fillOpacity);
        if (options.strokeOpacity) element.setAttribute("stroke-opacity", options.strokeOpacity);

        // Defaults
        if (!options.fill && element.tagName !== 'text' && element.tagName !== 'line') {
            element.setAttribute("fill", "none");
        }
        if (!options.stroke && element.tagName !== 'text') {
            element.setAttribute("stroke", "black");
        }
    }

    _getAlignmentProps(position) {
        const mapping = {
            'kiri atas': 'top-left',
            'tengah atas': 'top-center',
            'kanan atas': 'top-right',
            'kiri tengah': 'middle-left',
            'tengah': 'middle-center',
            'kanan tengah': 'middle-right',
            'kiri bawah': 'bottom-left',
            'tengah bawah': 'bottom-center',
            'kanan bawah': 'bottom-right'
        };
        const pos = mapping[position] || position || 'bottom-left';

        let anchor = "start";
        let baseline = "auto";
        let alignX = 0; // 0 = left
        let alignY = 1; // 1 = bottom

        switch (pos) {
            case 'top-left': anchor = "end"; baseline = "baseline"; alignX = 0; alignY = 0; break;
            case 'top-center': anchor = "middle"; baseline = "baseline"; alignX = 0.5; alignY = 0; break;
            case 'top-right': anchor = "start"; baseline = "baseline"; alignX = 1; alignY = 0; break;
            case 'middle-left': anchor = "end"; baseline = "central"; alignX = 0; alignY = 0.5; break;
            case 'middle-center': anchor = "middle"; baseline = "central"; alignX = 0.5; alignY = 0.5; break;
            case 'middle-right': anchor = "start"; baseline = "central"; alignX = 1; alignY = 0.5; break;
            case 'bottom-left': anchor = "end"; baseline = "hanging"; alignX = 0; alignY = 1; break;
            case 'bottom-center': anchor = "middle"; baseline = "hanging"; alignX = 0.5; alignY = 1; break;
            case 'bottom-right': anchor = "start"; baseline = "hanging"; alignX = 1; alignY = 1; break;
            default: anchor = "start"; baseline = "baseline"; alignX = 0; alignY = 0; break;
        }

        return { anchor, baseline, alignX, alignY, pos };
    }

    _applyTextAlignment(textElement, position) {
        const props = this._getAlignmentProps(position || 'bottom-left');
        textElement.setAttribute("text-anchor", props.anchor);
        textElement.setAttribute("dominant-baseline", props.baseline);
        return props;
    }

    _getLabelAlignment(labelPosition, padding) {
        const mapping = {
            'kiri atas': 'top-left', 'tengah atas': 'top-center', 'kanan atas': 'top-right',
            'kiri tengah': 'middle-left', 'tengah': 'middle-center', 'kanan tengah': 'middle-right',
            'kiri bawah': 'bottom-left', 'tengah bawah': 'bottom-center', 'kanan bawah': 'bottom-right'
        };
        const pos = mapping[labelPosition] || labelPosition || 'top-right';

        let dx = 0, dy = 0;
        let alignPos = 'bottom-left';

        switch (pos) {
            case 'top-left': dx = -padding; dy = -padding; alignPos = 'bottom-right'; break;
            case 'top-center': dx = 0; dy = -padding; alignPos = 'bottom-center'; break;
            case 'top-right': dx = padding; dy = -padding; alignPos = 'bottom-left'; break;
            case 'middle-left': dx = -padding; dy = 0; alignPos = 'middle-right'; break;
            case 'middle-center': dx = 0; dy = 0; alignPos = 'middle-center'; break;
            case 'middle-right': dx = padding; dy = 0; alignPos = 'middle-left'; break;
            case 'bottom-left': dx = -padding; dy = padding; alignPos = 'top-right'; break;
            case 'bottom-center': dx = 0; dy = padding; alignPos = 'top-center'; break;
            case 'bottom-right': dx = padding; dy = padding; alignPos = 'top-left'; break;
        }

        return { dx, dy, alignPos };
    }

    // Titik (Point)
    buatTitik(x, y, options = {}) {
        if (Array.isArray(x)) {
            options = y || {};
            y = x[1];
            x = x[0];
        }
        const group = document.createElementNS("http://www.w3.org/2000/svg", "g");

        const marker = options.marker || 'full-circle';
        const size = options.size || 4;
        const color = options.color || 'black';

        let shape;
        if (marker === 'full-circle') {
            shape = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            shape.setAttribute("cx", x);
            shape.setAttribute("cy", y);
            shape.setAttribute("r", size);
            shape.setAttribute("fill", color);
        } else if (marker === 'empty-circle') {
            shape = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            shape.setAttribute("cx", x);
            shape.setAttribute("cy", y);
            shape.setAttribute("r", size);
            shape.setAttribute("fill", "none");
            shape.setAttribute("stroke", color);
            shape.setAttribute("stroke-width", 1.5);
        } else if (marker === 'diamond') {
            shape = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
            const pts = `${x},${y - size} ${x + size},${y} ${x},${y + size} ${x - size},${y}`;
            shape.setAttribute("points", pts);
            shape.setAttribute("fill", color);
        } else if (marker === 'plus') {
            shape = document.createElementNS("http://www.w3.org/2000/svg", "path");
            const d = `M ${x - size} ${y} L ${x + size} ${y} M ${x} ${y - size} L ${x} ${y + size}`;
            shape.setAttribute("d", d);
            shape.setAttribute("stroke", color);
            shape.setAttribute("stroke-width", 1.5);
        }

        if (shape) group.appendChild(shape);

        // Label handling
        if (options.label) {
            const text = document.createElementNS("http://www.w3.org/2000/svg", "text");

            const padding = size + 4;
            const labelAlign = this._getLabelAlignment(options.labelPosition, padding);

            text.setAttribute("x", x + labelAlign.dx);
            text.setAttribute("y", y + labelAlign.dy);

            this._applyTextAlignment(text, labelAlign.alignPos);

            text.setAttribute("fill", color);
            text.setAttribute("font-size", options.fontSize || "12px");
            text.setAttribute("font-family", "sans-serif");
            text.textContent = options.label;
            group.appendChild(text);
        }

        this.svg.appendChild(group);
        return group;
    }

    // Garis (Line) - extended to act as an infinite line
    buatGaris(x1, y1, x2, y2, options = {}) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const length = Math.sqrt(dx * dx + dy * dy);
        if (length === 0) return null;

        const extend = 10000;
        const nx = dx / length;
        const ny = dy / length;

        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", x1 - nx * extend);
        line.setAttribute("y1", y1 - ny * extend);
        line.setAttribute("x2", x2 + nx * extend);
        line.setAttribute("y2", y2 + ny * extend);

        this._applyOptions(line, options);
        this.svg.appendChild(line);
        return line;
    }

    // Segmen (Line Segment)
    buatSegmen(x1, y1, x2, y2, options = {}) {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", x1);
        line.setAttribute("y1", y1);
        line.setAttribute("x2", x2);
        line.setAttribute("y2", y2);

        this._applyOptions(line, options);
        this.svg.appendChild(line);
        return line;
    }

    // Garis Sejajar (Parallel Line)
    // refP1, refP2 adalah titik [x, y] pembentuk garis referensi.
    // passThroughOrDistance bisa berupa titik [px, py] yang dilalui, atau angka (jarak offset)
    buatGarisSejajar(refP1, refP2, passThroughOrDistance, options = {}) {
        const dx = refP2[0] - refP1[0];
        const dy = refP2[1] - refP1[1];
        let px, py;

        if (typeof passThroughOrDistance === 'number') {
            const len = Math.sqrt(dx * dx + dy * dy);
            if (len === 0) return null;
            const dist = passThroughOrDistance;
            // Vektor normal
            const nx = -dy / len;
            const ny = dx / len;
            px = refP1[0] + nx * dist;
            py = refP1[1] + ny * dist;
        } else {
            px = passThroughOrDistance[0];
            py = passThroughOrDistance[1];
        }

        return this.buatGaris(px, py, px + dx, py + dy, options);
    }

    // Segmen Sejajar (Parallel Segment)
    // Akan membuat segmen yang panjang dan arahnya sama dengan referensi, 
    // atau panjangnya bisa diubah via options.length
    buatSegmenSejajar(refP1, refP2, passThroughOrDistance, options = {}) {
        const dx = refP2[0] - refP1[0];
        const dy = refP2[1] - refP1[1];
        let px, py;

        if (typeof passThroughOrDistance === 'number') {
            const len = Math.sqrt(dx * dx + dy * dy);
            if (len === 0) return null;
            const dist = passThroughOrDistance;
            const nx = -dy / len;
            const ny = dx / len;
            px = refP1[0] + nx * dist;
            py = refP1[1] + ny * dist;
        } else {
            px = passThroughOrDistance[0];
            py = passThroughOrDistance[1];
        }

        let finalX2 = px + dx;
        let finalY2 = py + dy;

        if (options.length !== undefined) {
            const len = Math.sqrt(dx * dx + dy * dy);
            if (len !== 0) {
                finalX2 = px + (dx / len) * options.length;
                finalY2 = py + (dy / len) * options.length;
            }
        }

        return this.buatSegmen(px, py, finalX2, finalY2, options);
    }

    // Poligon
    buatPoligon(points, options = {}) {
        const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        let ptsString = "";
        if (points.length > 0) {
            if (Array.isArray(points[0])) {
                ptsString = points.map(p => `${p[0]},${p[1]}`).join(" ");
            } else {
                ptsString = points.map(p => `${p.x},${p.y}`).join(" ");
            }
        }

        polygon.setAttribute("points", ptsString);

        this._applyOptions(polygon, options);
        this.svg.appendChild(polygon);
        return polygon;
    }

    // Segitiga (Triangle)
    buatSegitiga(x1, y1, x2, y2, x3, y3, options = {}) {
        return this.buatPoligon([{ x: x1, y: y1 }, { x: x2, y: y2 }, { x: x3, y: y3 }], options);
    }

    // Persegi Panjang (Rectangle)
    buatPersegiPanjang(x, y, width, height, options = {}) {
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", x);
        rect.setAttribute("y", y);
        rect.setAttribute("width", width);
        rect.setAttribute("height", height);

        this._applyOptions(rect, options);
        this.svg.appendChild(rect);
        return rect;
    }

    // Persegi (Square)
    buatPersegi(x, y, side, options = {}) {
        return this.buatPersegiPanjang(x, y, side, side, options);
    }

    // Lingkaran (Circle)
    buatLingkaran(cx, cy, r, options = {}) {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", cx);
        circle.setAttribute("cy", cy);
        circle.setAttribute("r", r);

        this._applyOptions(circle, options);
        this.svg.appendChild(circle);
        return circle;
    }

    // Elips (Ellipse)
    buatElips(cx, cy, rx, ry, options = {}) {
        const ellipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        ellipse.setAttribute("cx", cx);
        ellipse.setAttribute("cy", cy);
        ellipse.setAttribute("rx", rx);
        ellipse.setAttribute("ry", ry);

        this._applyOptions(ellipse, options);
        this.svg.appendChild(ellipse);
        return ellipse;
    }

    // Helper for polar to cartesian coordinates
    _polarToCartesian(centerX, centerY, radius, angleInDegrees) {
        const angleInRadians = angleInDegrees * Math.PI / 180.0;
        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    }

    // Busur Lingkaran (Arc)
    buatBusur(cx, cy, r, startAngle, endAngle, options = {}) {
        const start = this._polarToCartesian(cx, cy, r, startAngle);
        const end = this._polarToCartesian(cx, cy, r, endAngle);

        let diff = endAngle - startAngle;
        while (diff < 0) diff += 360;

        const largeArcFlag = diff > 180 ? "1" : "0";
        const sweepFlag = "1";

        const d = [
            "M", start.x, start.y,
            "A", r, r, 0, largeArcFlag, sweepFlag, end.x, end.y
        ].join(" ");

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", d);

        if (typeof options.fill === 'undefined') {
            options.fill = 'none';
        }

        this._applyOptions(path, options);
        this.svg.appendChild(path);
        return path;
    }

    // Sudut (Angle) dari 3 titik. p2 adalah titik sudut (vertex)
    buatSudut(p1, p2, p3, options = {}) {
        const x1 = p1[0], y1 = p1[1];
        const x2 = p2[0], y2 = p2[1];
        const x3 = p3[0], y3 = p3[1];

        const r = options.radius || 30; // ukuran wilayah lengkungan

        const a1 = Math.atan2(y1 - y2, x1 - x2);
        const a2 = Math.atan2(y3 - y2, x3 - x2);

        let diff = a2 - a1;
        while (diff <= -Math.PI) diff += 2 * Math.PI;
        while (diff > Math.PI) diff -= 2 * Math.PI;

        const sweepFlag = diff > 0 ? 1 : 0;

        const xA = x2 + r * Math.cos(a1);
        const yA = y2 + r * Math.sin(a1);
        const xB = x2 + r * Math.cos(a2);
        const yB = y2 + r * Math.sin(a2);

        const group = document.createElementNS("http://www.w3.org/2000/svg", "g");

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        const d = [
            "M", x2, y2,
            "L", xA, yA,
            "A", r, r, 0, 0, sweepFlag, xB, yB,
            "Z"
        ].join(" ");

        path.setAttribute("d", d);

        const pathOptions = { ...options };
        if (typeof pathOptions.fill === 'undefined') pathOptions.fill = "rgba(0, 0, 0, 0.1)"; // default semi-transparent
        if (typeof pathOptions.stroke === 'undefined') pathOptions.stroke = "black";

        this._applyOptions(path, pathOptions);
        group.appendChild(path);

        if (options.label) {
            const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            const a_bisect = a1 + diff / 2;
            const labelRadius = options.labelRadius || (r + 15);

            const xLabel = x2 + labelRadius * Math.cos(a_bisect);
            const yLabel = y2 + labelRadius * Math.sin(a_bisect);

            text.setAttribute("x", xLabel);
            text.setAttribute("y", yLabel);
            text.textContent = options.label;

            if (options.fontSize) text.setAttribute("font-size", options.fontSize);
            if (options.fontFamily) text.setAttribute("font-family", options.fontFamily);

            this._applyTextAlignment(text, options.labelPosition || 'middle-center');

            if (options.labelColor) text.setAttribute("fill", options.labelColor);
            else if (options.color) text.setAttribute("fill", options.color);
            else text.setAttribute("fill", "black");

            group.appendChild(text);
        }

        this.svg.appendChild(group);
        return group;
    }

    // Indikator Sudut Siku-Siku (Right-Angle Indicator)
    // p1, p2, p3 adalah 3 titik (p2 adalah titik sudut / vertex)
    buatSiku(p1, p2, p3, options = {}) {
        let pt1, pt2, pt3, opts;
        if (typeof p1 === 'number' && typeof p2 === 'number') {
            pt1 = [p1, p2];
            pt2 = [arguments[2], arguments[3]];
            pt3 = [arguments[4], arguments[5]];
            opts = arguments[6] || {};
        } else {
            pt1 = p1;
            pt2 = p2;
            pt3 = p3;
            opts = options || {};
        }

        const getXY = (p) => Array.isArray(p) ? { x: p[0], y: p[1] } : { x: p.x, y: p.y };
        const pA = getXY(pt1);
        const pV = getXY(pt2); // Vertex (titik sudut)
        const pB = getXY(pt3);

        const dx1 = pA.x - pV.x;
        const dy1 = pA.y - pV.y;
        const len1 = Math.hypot(dx1, dy1);

        const dx2 = pB.x - pV.x;
        const dy2 = pB.y - pV.y;
        const len2 = Math.hypot(dx2, dy2);

        if (len1 === 0 || len2 === 0) return null;

        const size = opts.size || opts.radius || 15;

        // Vektor satuan dari vertex ke pA dan pB
        const u1x = dx1 / len1;
        const u1y = dy1 / len1;
        const u2x = dx2 / len2;
        const u2y = dy2 / len2;

        // Titik-titik pembentuk simbol siku-siku (persegi pada sudut)
        const xA = pV.x + size * u1x;
        const yA = pV.y + size * u1y;
        const xC = pV.x + size * u2x;
        const yC = pV.y + size * u2y;
        const xB = xA + size * u2x;
        const yB = yA + size * u2y;

        const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

        let d;
        if (opts.fill && opts.fill !== 'none') {
            d = `M ${pV.x} ${pV.y} L ${xA} ${yA} L ${xB} ${yB} L ${xC} ${yC} Z`;
        } else {
            d = `M ${xA} ${yA} L ${xB} ${yB} L ${xC} ${yC}`;
        }

        path.setAttribute("d", d);

        const pathOptions = { ...opts };
        if (typeof pathOptions.fill === 'undefined') pathOptions.fill = "none";
        if (typeof pathOptions.stroke === 'undefined') pathOptions.stroke = "black";

        this._applyOptions(path, pathOptions);
        group.appendChild(path);

        // Opsi jika ingin menambahkan titik di tengah siku-siku
        if (opts.dot || opts.showDot) {
            const dotCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            const dotX = pV.x + (size / 2) * (u1x + u2x);
            const dotY = pV.y + (size / 2) * (u1y + u2y);
            const dotRadius = opts.dotRadius || 1.5;
            dotCircle.setAttribute("cx", dotX);
            dotCircle.setAttribute("cy", dotY);
            dotCircle.setAttribute("r", dotRadius);
            dotCircle.setAttribute("fill", pathOptions.stroke || "black");
            group.appendChild(dotCircle);
        }

        // Label opsional
        if (opts.label) {
            const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            const a1 = Math.atan2(dy1, dx1);
            const a2 = Math.atan2(dy2, dx2);
            let diff = a2 - a1;
            while (diff <= -Math.PI) diff += 2 * Math.PI;
            while (diff > Math.PI) diff -= 2 * Math.PI;
            const a_bisect = a1 + diff / 2;
            const labelRadius = opts.labelRadius || (size + 15);

            const xLabel = pV.x + labelRadius * Math.cos(a_bisect);
            const yLabel = pV.y + labelRadius * Math.sin(a_bisect);

            text.setAttribute("x", xLabel);
            text.setAttribute("y", yLabel);
            text.textContent = opts.label;

            if (opts.fontSize) text.setAttribute("font-size", opts.fontSize);
            if (opts.fontFamily) text.setAttribute("font-family", opts.fontFamily);

            this._applyTextAlignment(text, opts.labelPosition || 'middle-center');

            if (opts.labelColor) text.setAttribute("fill", opts.labelColor);
            else if (opts.color) text.setAttribute("fill", opts.color);
            else text.setAttribute("fill", "black");

            group.appendChild(text);
        }

        this.svg.appendChild(group);
        return group;
    }

    // Teks (Text)
    buatTeks(x, y, textContent, options = {}) {
        if (Array.isArray(x)) {
            options = textContent || {};
            textContent = y;
            y = x[1];
            x = x[0];
        }
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", x);
        text.setAttribute("y", y);
        text.textContent = textContent;

        if (options.fontSize) text.setAttribute("font-size", options.fontSize);
        if (options.fontFamily) text.setAttribute("font-family", options.fontFamily);

        this._applyTextAlignment(text, options.position);

        if (options.color) text.setAttribute("fill", options.color);
        else if (options.fill) text.setAttribute("fill", options.fill);
        else text.setAttribute("fill", "black");

        const textOptions = { ...options };
        delete textOptions.stroke;
        if (options.stroke) textOptions.stroke = options.stroke;
        else textOptions.stroke = "none";

        this._applyOptions(text, textOptions);
        this.svg.appendChild(text);
        return text;
    }

    // LaTeX (MathJax)
    buatLatex(x, y, latexString, options = {}) {
        if (Array.isArray(x)) {
            options = latexString || {};
            latexString = y;
            y = x[1];
            x = x[0];
        }
        const foreignObject = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
        // Memberikan ukuran default agar MathJax memiliki ruang untuk render
        foreignObject.setAttribute("width", options.width || 500);
        foreignObject.setAttribute("height", options.height || 200);
        foreignObject.style.overflow = "visible";

        const div = document.createElement("div");
        div.style.display = "inline-block"; // Allows accurate scrollWidth/Height
        div.style.color = options.color || "black";
        if (options.fontSize) div.style.fontSize = options.fontSize;

        // Mode display untuk block equation atau inline
        const isDisplay = options.displayMode || false;
        div.innerHTML = isDisplay ? `\\[ ${latexString} \\]` : `\\( ${latexString} \\)`;

        foreignObject.appendChild(div);
        this.svg.appendChild(foreignObject);

        const props = this._getAlignmentProps(options.position);

        const adjustPosition = () => {
            const w = div.scrollWidth + 2; // small padding to prevent clipping
            const h = div.scrollHeight + 2;
            foreignObject.setAttribute("width", w);
            foreignObject.setAttribute("height", h);

            foreignObject.setAttribute("x", x - (w * props.alignX));
            foreignObject.setAttribute("y", y - (h * props.alignY));
        };

        // Render menggunakan MathJax jika tersedia
        if (window.MathJax && MathJax.typesetPromise) {
            MathJax.typesetPromise([div]).then(adjustPosition)
                .catch((err) => console.log('MathJax rendering error: ', err));
        } else if (window.MathJax && window.MathJax.Hub) {
            window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, div], adjustPosition);
        } else {
            console.warn("MathJax tidak ditemukan. Harap pastikan MathJax sudah diload di halaman HTML Anda.");
            setTimeout(adjustPosition, 0);
        }

        return foreignObject;
    }

    // Clear the SVG canvas
    clear() {
        while (this.svg.firstChild) {
            this.svg.removeChild(this.svg.firstChild);
        }
    }
}

// Export for module usage (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GeoSVG;
}
