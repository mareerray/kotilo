function WoodlandSide() {
    return (
        <>
            {/* Soft ground shadow */}
            <ellipse
                cx="94"
                cy="344"
                rx="88"
                ry="8"
                fill="#34483d"
                opacity="0.1"
            />

            {/* Rear tree: trunk and branches */}
            <g
                fill="none"
                stroke="#89735c"
                strokeLinecap="round"
            >
                <path
                    d="M130 330 C128 270 137 194 129 92"
                    strokeWidth="10"
                />
                <path
                    d="M132 220 Q109 195 101 163
                       M132 181 Q152 161 159 133"
                    strokeWidth="5"
                />
            </g>

            {/* Rear tree: uneven leafy crown */}
            <path
                d="
                    M130 28
                    C113 24 103 37 102 51
                    C84 48 74 65 78 82
                    C62 93 64 113 73 125
                    C60 143 68 165 83 172
                    C78 193 95 210 111 209
                    C122 224 144 219 151 206
                    C172 208 184 188 178 173
                    C195 159 190 137 179 128
                    C189 109 179 91 168 86
                    C173 66 159 53 148 52
                    C148 37 142 29 130 28 Z
                "
                fill="#9db69a"
            />

            {/* Rear foliage shade */}
            <path
                d="
                    M153 64
                    C172 92 164 117 174 140
                    C185 166 170 195 148 203
                    C135 212 121 211 111 209
                    C137 191 143 169 140 143
                    C138 114 156 91 153 64 Z
                "
                fill="#789775"
                opacity="0.45"
            />

            {/* Front tree: trunk and branches */}
            <g
                fill="none"
                stroke="#79634f"
                strokeLinecap="round"
            >
                <path
                    d="M59 334 C65 284 58 231 66 149"
                    strokeWidth="11"
                />
                <path
                    d="M62 273 Q42 250 35 223
                       M62 241 Q83 217 88 192"
                    strokeWidth="5"
                />
            </g>

            {/* Front tree: asymmetrical crown */}
            <path
                d="
                    M65 106
                    C48 102 37 116 38 129
                    C21 127 12 143 17 158
                    C3 170 7 191 16 200
                    C7 217 17 238 31 241
                    C29 259 46 270 60 265
                    C73 279 92 270 97 256
                    C116 254 124 236 116 221
                    C130 206 122 188 113 181
                    C122 163 111 147 99 144
                    C100 124 84 113 75 117
                    C74 111 70 108 65 106 Z
                "
                fill="#6f9278"
            />

            {/* Front foliage shade */}
            <path
                d="
                    M92 150
                    C107 179 94 193 105 217
                    C114 240 92 260 73 265
                    C92 235 76 216 83 193
                    C89 176 95 166 92 150 Z
                "
                fill="#4f725b"
                opacity="0.5"
            />

            {/* Small clusters of lighter leaves */}
            <g fill="#c1d0ac" opacity="0.4">
                <ellipse cx="112" cy="69" rx="10" ry="5" transform="rotate(-30 112 69)" />
                <ellipse cx="91" cy="112" rx="9" ry="4" transform="rotate(25 91 112)" />
                <ellipse cx="140" cy="99" rx="10" ry="5" transform="rotate(-20 140 99)" />
                <ellipse cx="43" cy="155" rx="9" ry="4" transform="rotate(-35 43 155)" />
                <ellipse cx="27" cy="188" rx="8" ry="4" transform="rotate(20 27 188)" />
                <ellipse cx="66" cy="211" rx="10" ry="5" transform="rotate(-25 66 211)" />
            </g>

            {/* Low bush with uneven lobes */}
            <path
                d="
                    M17 341
                    C7 332 10 317 22 311
                    C18 298 31 285 44 289
                    C48 272 67 270 78 283
                    C88 271 107 279 109 293
                    C124 284 139 294 139 307
                    C156 305 166 321 157 334
                    C143 346 122 343 104 345
                    L39 345
                    Q24 346 17 341 Z
                "
                fill="#78915f"
            />

            {/* Bush lower shade */}
            <path
                d="
                    M17 331
                    Q43 342 68 333
                    Q92 343 115 332
                    Q140 337 160 326
                    Q161 345 137 345
                    L36 347
                    Q21 346 17 331 Z
                "
                fill="#56734f"
                opacity="0.6"
            />

            {/* Small leaves among the flowers and berries */}
            <g fill="#abc18b">
                <ellipse cx="42" cy="310" rx="6" ry="3" transform="rotate(-30 42 310)" />
                <ellipse cx="82" cy="301" rx="6" ry="3" transform="rotate(25 82 301)" />
                <ellipse cx="117" cy="318" rx="7" ry="3" transform="rotate(-25 117 318)" />
                <ellipse cx="64" cy="331" rx="6" ry="3" transform="rotate(20 64 331)" />
            </g>

            {/* Berry clusters */}
            <g fill="#a85468">
                <circle cx="96" cy="312" r="3" />
                <circle cx="102" cy="313" r="3" />
                <circle cx="99" cy="318" r="3" />

                <circle cx="34" cy="326" r="2.8" />
                <circle cx="40" cy="327" r="2.8" />
                <circle cx="37" cy="332" r="2.8" />
            </g>

            {/* Tiny berry highlights */}
            <g fill="#edbdc5" opacity="0.8">
                <circle cx="95" cy="311" r="0.9" />
                <circle cx="101" cy="312" r="0.9" />
                <circle cx="33" cy="325" r="0.8" />
            </g>

            {/* Cream flower */}
            <g transform="translate(58 303)">
                <g fill="#fff3d9">
                    <ellipse cy="-4" rx="2.6" ry="4" />
                    <ellipse cy="4" rx="2.6" ry="4" />
                    <ellipse cx="-4" rx="4" ry="2.6" />
                    <ellipse cx="4" rx="4" ry="2.6" />
                </g>
                <circle r="2.2" fill="#d6aa54" />
            </g>

            {/* Smaller pink flower */}
            <g transform="translate(128 329) scale(0.75)">
                <g fill="#e8b9c2">
                    <ellipse cy="-4" rx="2.6" ry="4" />
                    <ellipse cy="4" rx="2.6" ry="4" />
                    <ellipse cx="-4" rx="4" ry="2.6" />
                    <ellipse cx="4" rx="4" ry="2.6" />
                </g>
                <circle r="2.2" fill="#f0cf7d" />
            </g>
        </>
    );
}

function HouseGreenery() {
    return (
        <div className="house-greenery" aria-hidden="true">
            <svg
                className="house-greenery__side house-greenery__side--left"
                viewBox="0 0 180 360"
                focusable="false"
            >
                <WoodlandSide />
            </svg>

            <svg
                className="house-greenery__side house-greenery__side--right"
                viewBox="0 0 180 360"
                focusable="false"
            >
                <WoodlandSide />
            </svg>
        </div>
    );
}

export default HouseGreenery;