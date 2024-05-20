import {
  Group,
  Paper,
  Text,
  ThemeIcon,
  SimpleGrid,
  Skeleton,
  Overlay,
} from "@mantine/core";
import { IconArrowUpRight, IconArrowDownRight } from "@tabler/icons-react";
import classes from "./StatsGridIcons.module.css";

const data = [
  { title: "Revenue", value: "$13,456", diff: 34 },
  { title: "Profit", value: "$4,145", diff: -13 },
  { title: "Coupons usage", value: "745", diff: 18 },
];

export function StatsGridIcons() {
  const stats = data.map((stat) => {
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <Paper withBorder p="md" radius="md" h={200} key={stat.title}>
        <Group justify="apart">
          <div className="div-click">
            <Text
              c="dimmed"
              tt="uppercase"
              fw={700}
              fz="xs"
              className={classes.label}
            >
              {stat.title}
            </Text>
            <Text fw={700} fz="xl">
              {stat.value}
            </Text>
            <Overlay color="#000" backgroundOpacity={0.005} blur={1} />
          </div>
          <ThemeIcon
            color="gray"
            variant="light"
            style={{
              color:
                stat.diff > 0
                  ? "var(--mantine-color-teal-6)"
                  : "var(--mantine-color-red-6)",
            }}
            size={38}
            radius="md"
          >
            <DiffIcon size="1.8rem" stroke={1.5} />
          </ThemeIcon>
        </Group>

        <div className={classes.comingSoonContainer}>
          <Text
            // className={classes.comingSoonText}
            className={`${classes.comingSoonText} ${classes.gradientAnimation}`}
            // variant="gradient"
            // gradient={{ from: "teal", to: "red", deg: 0 }}
            size="lg"
            fw={900}
          >
            Comming Soon
          </Text>
        </div>
      </Paper>
    );
  });

  return (
    <div className={classes.root}>
      <SimpleGrid cols={{ base: 1, sm: 3 }}>{stats}</SimpleGrid>
    </div>
  );
}
