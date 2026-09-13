/**
 * 标签云数据
 * ---------------------------------------------------------------
 * 如何新增 / 删除标签：只需在本数组中增删一个对象即可。
 *   - name  : 标签显示文字（必填）
 *   - url   : 点击跳转链接；留空 '' 表示不跳转（仅展示，可触发魔法阵）
 *   - weight: 权重 1~5，决定字号大小（选填，默认 3）
 * ---------------------------------------------------------------
 */
/**
 * 标签云配色（高饱和霓虹色系，避免过淡）
 * ---------------------------------------------------------------
 * 颜色统一在此处管理：修改 / 扩充调色板只需改这一个数组。
 * 色值会由下方 .color-N 类映射到标签上（N = index % TAG_COLORS.length）。
 * 也可在单个标签上写 color: 0~4 强制指定颜色，不写则按索引自动取色。
 * ---------------------------------------------------------------
 */
const TAG_COLORS = ['#FF3D8B', '#22D3EE', '#FFC83D', '#39E075', '#B57BFF'];
//                    玫红      青蓝        琥珀黄      翠绿       亮紫

const TAG_LIST = [
  { name: '二次元',   url: '', weight: 5 },
  { name: '足控', url: '', weight: 5 },
  { name: 'Galgame',  url: '', weight: 4 },
  { name: '闷骚',     url: '', weight: 3 },
  { name: 'UE6',    url: 'https://www.unrealengine.com/news/the-road-to-ue-6', weight: 4 },
  { name: 'C++',       url: '', weight: 3 },
  { name: '妹控',   url: '', weight: 3 },
  { name: '深度学习',     url: '', weight: 4 },
  { name: '京阿尼',     url: '', weight: 3 },
  { name: '日语',url: '', weight: 3 },
  { name: '追番',     url: '', weight: 5, color: 0 },
  { name: '新海诚',   url: '', weight: 4 },
  { name: 'Python',     url: '', weight: 3 },
  { name: '游戏开发',     url: '', weight: 4 },
  { name: '过膝袜控',   url: '', weight: 4 },
  { name: '阴角',     url: '', weight: 2 },
  { name: 'Github', url: 'https://github.com/PantsuMeow', weight: 2 },
  { name: '3A大作',     url: '', weight: 3 },
  { name: '腿控',   url: '', weight: 2 },
  { name: '大模型',   url: '', weight: 3 },
  { name: '旅游',url: '', weight: 2, color: 3 },
  { name: '萝莉控',     url: '', weight: 3 },
  { name: '技术宅', url: '', weight: 3 },
  { name: '母胎单身',    url: '', weight: 2 },
  { name: '裤袜控',   url: '', weight: 2 },
  { name: '纯爱战士',     url: '', weight: 4 },
  { name: '古典音乐',     url: '', weight: 3 },
  { name: 'Ciallo~',  url: 'https://blog.pantsu0721.top/ciallo/ciallo.html', weight: 3, color: 0 }
];

/**
 * 渲染标签云
 *  - 根据 weight 映射字号等级(size)，并按索引映射颜色(color)，营造层次感
 *  - 每个标签自带递增的 animation-delay，实现"依次从小到大弹出"的入场效果
 */
function renderTagCloud() {
  const container = document.getElementById('tag-cloud');
  if (!container) return;

  // 清空后再渲染，保证重复调用（如切换标签栏重播动画）不会重复堆叠
  container.innerHTML = '';

  TAG_LIST.forEach((tag, index) => {
    const el = document.createElement('a');
    const size = Math.min(Math.max(tag.weight || 3, 1), 5); // 限制在 1~5
    // 颜色：优先用标签自身 color 字段，否则按索引自动循环取色
    const colorIndex = (tag.color != null ? tag.color : index) % TAG_COLORS.length;
    const colorValue = TAG_COLORS[colorIndex];

    el.className = `tag size-${size}`;
    // 通过 CSS 变量传色，颜色统一管理，无需为每个色号写固定 class
    el.style.setProperty('--tag-color', colorValue);
    // 依次入场：每个标签延迟 60ms，形成波浪式从小到大动画
    el.style.animationDelay = `${index * 60}ms`;

    if (tag.url) {
      el.href = tag.url;
      el.target = '_blank';
      el.rel = 'noopener';
    } else {
      el.href = 'javascript:void(0);';
    }
    el.textContent = tag.name;

    container.appendChild(el);
  });
}

// DOM 就绪后立即渲染
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderTagCloud);
} else {
  renderTagCloud();
}
