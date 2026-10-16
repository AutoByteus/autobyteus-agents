// Runs the INSTALLED AutoByteus v1.5.4 server code (read-only) to see which task tools a definition gets.
const D = "/Applications/AutoByteus.app/Contents/Resources/server/dist";
const { buildRuntimeAgentToolExposure } = await import(`${D}/agent-execution/shared/runtime-agent-tool-exposure.js`);
const { AgentToolMcpCatalog } = await import(`${D}/agent-tools/mcp/agent-tool-mcp-catalog.js`);
const catalog = new AgentToolMcpCatalog();
const task = (n) => /task/.test(n);
console.log("static task adapters known to this app:", catalog.listStaticAdapterToolNames().filter(task));
const cases = {
  "PM transition list (old + new names)": ["list_projects","create_or_update_project","list_project_tasks","create_or_update_task","create_task","update_task","list_available_agents","delegate_task","send_message_to","read_file"],
  "new names only": ["list_projects","list_project_tasks","create_task","update_task","delegate_task","send_message_to"],
};
for (const [label, names] of Object.entries(cases)) {
  for (const ctx of [null, { teamScoped: false }]) {
    const exposure = buildRuntimeAgentToolExposure(names, ctx);
    let enabled;
    try { enabled = catalog.resolveRuntimeSessionToolExposure(exposure).enabledTools; } catch (e) { enabled = "ERROR " + e.message; }
    console.log(`\n[${label}] member context: ${ctx ? "yes" : "no"}`);
    console.log("  requested task names:", exposure.requestedToolNames.filter(task));
    console.log("  enabledProjectTaskToolNames:", exposure.enabledProjectTaskToolNames);
    console.log("  MCP tools the agent gets (task ones):", Array.isArray(enabled) ? enabled.filter(task) : enabled);
  }
}
