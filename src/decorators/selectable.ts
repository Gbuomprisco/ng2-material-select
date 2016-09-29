export function Selectable() {
    return function(target) {
        const toggle = function(item): void {
            if (this.multiple === false) {
                return;
            }

            if (this.isSelected(item)) {
                this.selected = this.selected.filter(value => value !== item);
            } else {
                this.selected.push(item);
            }
        };

        Object.assign(target.prototype, {
            toggle
        });
    };
}
