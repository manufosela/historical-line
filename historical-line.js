import { LitElement, html, css } from 'lit-element';

/**
 * `historical-line`
 * HistoricalLine
 *
 * @customElement historical-line
 * @polymer
 * @litElement
 * @demo demo/index.html
 */

class HistoricalLine extends LitElement {
  static get is() {
    return 'historical-line';
  }

  static get properties() {
    return {
      title: { type: String },
      startYear: { type: Number },
      endYear: { type: Number },
      data: { type: Array }
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        overflow-x: scroll;
        overflow-y: hidden;
        margin: 20px;
        --font-size: 16px;
        --title-color: #000;
      }
      .container {
        font-size:var(--font-size);
        border-spacing: 0; width:100vw;
      }
      .title {
        padding: 0 20px;
        font-size: 1.5rem;
        color: var(--title-color);
      }
      td {
        width:calc(100vw/264);
        vertical-align:top;
        padding: 0.1vw;
      }
      .item, .desc, .year {
        margin:0;
        padding:0.1vw;
        border:1px solid black;
        font-weight:bold;
      }
      .desc {
        border-radius:20px;
        border: 0;
        border-top: 1px solid black;
        font-size: 0.8rem;
        padding: 10px;
      }

      .item:first-child, .year:first-child {
        border-left:0;
      }

      .item:last-child, .year:last-child {
        border-right:0;
      }

      .desc:first-child, .desc:last-child {
        border:0;
      }
      #space {
        height:30px;
      }
    `;
  }

  constructor() {
    super();
    this.today = new Date();
    this.data = [];
  }

  connectedCallback() {
    super.connectedCallback();

    this.startYear = this.startYear || this.today.getFullYear();
    this.endYear = this.endYear || this.today.getFullYear();
    this.startDate = new Date('12/1/' + (this.startYear - 1));
    this.endDate = new Date('31/12/' + this.endYear);

    this.numMonths = (this.endYear - this.startYear + 1) * 12;
  }

  monthDiff(d1, d2) {
    let months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth() + 1;
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }

  calcData() {
    this.data.unshift({start: '1/1/' + this.startYear, main: '', bg: '', desc: ''});
    this.data.push({start: this.today.getMonth() + '/' + this.today.getDate() + '/' + this.today.getFullYear(), main: '', desc: '', bg: ''});

    this.data.push({start: '12/1/' + this.endYear, main: '', desc: '', bg: ''});

    let newStart = this.startDate;
    this.arrColspan = this.data.map((t, index) => {
      if (index === 0) {
        return '';
      }
      let s = new Date(newStart);
      let e = new Date(t.start);
      let m = this.monthDiff(s, e);
      newStart = t.start;
      return m + 1;
    });

    let counter = 1;
    this.arrYears = [];
    for (let y = this.startYear; y <= this.endYear; y++) {
      this.arrYears.push(`<td class="year" colspan="12">${y}</td>`);
    }

    this.arrMain = this.data.map((el, index)=>{
      return `<td class="item" style="background:${el.bg}" colspan="${this.arrColspan[index + 1]}">${el.main}</td>`;
    });
    this.arrMain.pop();

    this.arrDesc = this.data.map((el, index)=>{
      return `<td class="desc" colspan="${this.arrColspan[index + 1]}">${el.desc}</td>`;
    });
    this.arrDesc.pop();
  }

  drawHistLine() {
    this.shadowRoot.querySelector('#rule').innerHTML = '<td class="rule-item">|</td>'.repeat(this.numMonths);
    this.shadowRoot.querySelector('#years').innerHTML = this.arrYears.join('');
    this.shadowRoot.querySelector('#main').innerHTML = this.arrMain.join('');
    this.shadowRoot.querySelector('#desc').innerHTML = this.arrDesc.join('');
  }

  updated() {
    this.calcData();
    this.drawHistLine();
  }

  render() {
    return html`
      <h3 class="title">${this.title}</h3>
      <table class="container">
        <tr id="years"></tr>
        <tr id="rule"></tr>
        <tr id="main"></tr>
        <tr id="space"></tr>
        <tr id="desc"></tr>
      </table>
    `;
  }
}

window.customElements.define(HistoricalLine.is, HistoricalLine);