const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../public/assets/penguins');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const inputPath = path.join(__dirname, '../public/assets/aistudio/image_3b1c583c.png');

// Grid configuration
// 6 columns, 6 rows (row 5 only has 2 items)
const items = [
  // Row 0
  { row: 0, col: 0, id: 'fool', name: '이 바보들아' },
  { row: 0, col: 1, id: 'ruined', name: '망했다' },
  { row: 0, col: 2, id: 'runaway', name: '도망가자' },
  { row: 0, col: 3, id: 'mine', name: '내꺼다' },
  { row: 0, col: 4, id: 'heart', name: '주까 마까' },
  { row: 0, col: 5, id: 'annoying', name: '왠지 재수없다 너' },

  // Row 1
  { row: 1, col: 0, id: 'tired_bottle', name: '너덜' },
  { row: 1, col: 1, id: 'fishing', name: '먹고살기 힘들다' },
  { row: 1, col: 2, id: 'lazy_flat', name: '노곤하다' },
  { row: 1, col: 3, id: 'our_territory', name: '우리 구역이다' },
  { row: 1, col: 4, id: 'hide', name: '숨어 숨어' },
  { row: 1, col: 5, id: 'damn_spotlight', name: '젠장' },

  // Row 2
  { row: 2, col: 0, id: 'regret_milk', name: '후회' },
  { row: 2, col: 1, id: 'ribbon_bow', name: '날 가져라' },
  { row: 2, col: 2, id: 'lingering', name: '미련' },
  { row: 2, col: 3, id: 'proud_snowman', name: '나 좀 잘한 듯' },
  { row: 2, col: 4, id: 'hobby', name: '그냥 취미다' },
  { row: 2, col: 5, id: 'scratch', name: '긁적' },

  // Row 3
  { row: 3, col: 0, id: 'jealous', name: '질투난다' },
  { row: 3, col: 1, id: 'hurt_bandaid', name: '상처받았다' },
  { row: 3, col: 2, id: 'sick_soup', name: '왜 아프고 난리냐' },
  { row: 3, col: 3, id: 'revenge', name: '복수할거다' },
  { row: 3, col: 4, id: 'perfect_plan', name: '완벽한 계획이다' },
  { row: 3, col: 5, id: 'be_ready', name: '각오해라' },

  // Row 4
  { row: 4, col: 0, id: 'not_my_type_book', name: '이런건 체질이 아니다' },
  { row: 4, col: 1, id: 'awesome_statue', name: '쩐다' },
  { row: 4, col: 2, id: 'is_it_about_me', name: '뭐지 내 얘긴가' },
  { row: 4, col: 3, id: 'my_way', name: '내 맘이다' },
  { row: 4, col: 4, id: 'doubt', name: '의심' },
  { row: 4, col: 5, id: 'i_hate_it', name: '실은 나다' },

  // Row 5
  { row: 5, col: 0, id: 'waiting_coffee', name: '기다리는 중' },
  { row: 5, col: 1, id: 'call_me', name: '연락해라' },
];

const colStarts = [40, 185, 330, 475, 620, 765];
const colWidth = 142;

const rowStarts = [80, 205, 335, 465, 595, 725];
const rowHeight = 125;

async function cropAll() {
  for (const item of items) {
    const left = colStarts[item.col];
    const top = rowStarts[item.row];
    const outFile = path.join(outDir, `${item.id}.png`);

    await sharp(inputPath)
      .extract({
        left: Math.max(0, left),
        top: Math.max(0, top),
        width: Math.min(colWidth, 935 - left),
        height: Math.min(rowHeight, 852 - top),
      })
      .trim({ background: '#FFFFFF', threshold: 10 })
      .toFile(outFile);

    console.log(`Cropped: ${item.id} (${item.name})`);
  }
}

cropAll().catch(console.error);
