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

        const isSelected = function(item): boolean {
            return this.selected.indexOf(item) >= 0;
        };

        Object.assign(target.prototype, {
            toggle,
            isSelected
        });
    };
}
