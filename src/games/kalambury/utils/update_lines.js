export const UpdateTypes = {
  add: "add",
  append: "append",
  delete: "delete",
  replace: "replace",
};

export function updateLines(lines, updateType, updateData = null) {
  switch (updateType) {
    case UpdateTypes.add:
      return [...lines, updateData];
    case UpdateTypes.append:
      const last = lines[lines.length - 1];
      return [...lines.slice(0, -1), { ...last, points: [...last.points, ...updateData] }];
    case UpdateTypes.delete:
      return lines.slice(0, -1);
    case UpdateTypes.replace:
      return updateType;
    default:
      return lines;
  }
}
