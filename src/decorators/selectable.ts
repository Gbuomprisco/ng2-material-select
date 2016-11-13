const equal = require('equals');

export function Selectable() {
    return function(target) {
        const toggle = function(item): void {
            if (this.multiple === false) {
                return;
            }

            if (this.isSelected(item)) {
                this.value = this.value.filter(value => !this.isEqual(item, value));
            } else {
                this.value = [...this.value, item];
            }
        };

        Object.assign(target.prototype, {
            toggle
        });
    };
}
