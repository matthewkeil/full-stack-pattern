/* eslint-disable @typescript-eslint/no-non-null-assertion */
// import { getCertArnForDomain } from './lib/aws/certificateManager';

import { prefetch } from 'webpack';

// getCertArnForDomain({ profile: 'admin', region: 'us-east-1', domain: 'dev.codeified.org' }).then(arn =>
//   console.log(arn)
// );

class Node {
  data: number;
  next?: Node;
  constructor(data: number) {
    this.data = data;
    this.next = undefined;
  }
}

function viewList(head: Node) {
  let current: Node | undefined = head;
  while (current) {
    console.log(current.data);
    current = current.next;
  }
}

function buildList(values: number[]) {
  const head = new Node(values[0]);
  let tail = new Node(values[1]);
  head.next = tail;
  for (let i = 2; i < values.length; i++) {
    const node = new Node(values[i]);
    tail.next = node;
    tail = node;
  }
  return head;
}

function reverse(head: Node, k: number) {
  let prev = undefined;
  let current: Node | undefined = head;
  let following: Node | undefined = head;
  let count = 0;

  while (current && count < k) {
    following = following?.next;
    current.next = prev;
    prev = current;
    current = following;
    count++;
  }

  if (following) {
    head.next = reverse(following, k);
  }

  return prev as Node;
}

const _values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const _head = buildList(_values);
viewList(reverse(_head, 3));

class SpecialStack {
  private _stack: number[];
  constructor() {
    this._stack = [];
  }
  /**
   * @param {number} x
   * @return {void}
   */
  push(num: number) {
    this._stack.push(num);
  }
  /**
   * @return {number}
   */
  pop(): number | undefined {
    return this._stack.pop();
  }

  /**
   * @return {boolean}
   */
  isFull() {
    return this._stack.length
  }
  /**
   * @return {boolean}
   */
  isEmpty() {
    return this._stack.length === 0;
  }
  /**
   * @return {number}
   */
  getMin() {
    let min: number | undefined;
    this._stack.forEach(num => {
      if (!min || num < min) {
        min = num;
      }
    });
    return min;
  }
}
