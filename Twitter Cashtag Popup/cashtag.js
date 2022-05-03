const body = document.querySelector('body')
const popover = document.createElement('div')
popover.id = 'cashtag-popover'

let currentSymbol = ''

const showChart = (symbol, x, y) => {
  symbol = symbol.toUpperCase()

  if (currentSymbol != symbol) {
    body.appendChild(popover)
    popover.style.top = y + 'px';
    popover.style.left = x + 'px';

    if (!document.getElementById('cashtag-popup')) {
      const tv = document.createElement('div')
      tv.id = 'cashtag-popup'
      popover.appendChild(tv)
    }

    const widget = new TradingView.widget(
      {
        "width": 768,
        "height": 500,
        "symbol": `${symbol}`,
        "timezone": "exchange",
        "theme": "dark",
        "style": "3",
        "locale": "en",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "hide_legend": true,
        "withdateranges": true,
        "range": "12M",
        "allow_symbol_change": true,
        "save_image": false,
        "details": true,
        "container_id": "cashtag-popup"
      }
    );
  }
  currentSymbol = symbol

  body.addEventListener('click', (clickEvent) => {
    const target = clickEvent.target

    if (target.id != 'cashtag-popover') {
      currentSymbol = ''
      popover.remove()
    }
  })
}

body.addEventListener('mousemove', (event) => {
  const target = event.target

  if (target.tagName === 'A') {
    const href = target.getAttribute('href')

    if (href.includes('cashtag_click')) {
      let symbol = href.split('%24')[1].split("&")[0]
      if (symbol.includes('.')) {
        symbol = symbol.split('.')[0]
      }

      var x = event.pageX;
      var y = event.pageY;

      showChart(symbol, x, y)
    }
  }
})
