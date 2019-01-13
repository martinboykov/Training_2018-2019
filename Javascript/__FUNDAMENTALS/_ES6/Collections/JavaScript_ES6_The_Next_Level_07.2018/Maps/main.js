const m = new Map();
const sb = { name: 'SkillBakery' };
m.set(sb, 'Learning ES6');
console.log(m);
console.log(m.has(sb));
console.log(m.get(sb));
console.log(m.get(sb.name));
console.log(m.set('setting', { foo: 'foo' }));
console.log(m.has('new obj'));
console.log(m);
console.log(m.keys());
console.log(m.values());
for (const [key, value] of m) {
    console.log(key, value);
}
