enum RANGE {
    max = 6,
    min = 3
}

enum COLORS {
    GREEN = "green",
    ORANGE = "orange",
    RED = "red"
}

export const getBarColor = (value: number) => {
    if (value > RANGE.max) {
        return COLORS.GREEN as string;
    } else if (value > RANGE.min) {
        return COLORS.ORANGE;
    } else {
        return COLORS.RED as string;
    }
};