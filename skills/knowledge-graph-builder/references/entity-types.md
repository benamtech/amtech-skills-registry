# Entity Type Vocabulary

Type every node with exactly one of these. A controlled vocabulary keeps the graph consistent, which is what makes it traversable and rankable. If a node resists typing, it is usually two nodes or not an entity.

| Type | What it is | Examples | Typical schema.org |
| --- | --- | --- | --- |
| `Service` | Something the business does for a customer. | "Pool route management," "tax prep" | `Service` |
| `Product` | A discrete thing sold. | "Robotic pool cleaner," "estimate template" | `Product` |
| `Method` | A repeatable technique or framework. | "Entity-first SEO," "margin analysis" | `Article` / `HowTo` |
| `Tool` | A named instrument or platform used. | "QuickBooks," "JSON-LD," "llms.txt" | `SoftwareApplication` |
| `Use Case` | An operational job the domain performs. | "Demand forecasting," "owner briefing" | `Article` / `HowTo` |
| `Outcome` | A result the customer gets. | "Fewer stockouts," "agent-readable knowledge" | property of a Service |
| `Problem` | A pain the domain resolves. | "Owner bottleneck," "margin leakage" | `Article` |
| `Industry` | A vertical served. | "Independent pharmacy," "HVAC" | `Audience` / `areaServed` |
| `Customer` | A buyer type or persona. | "Local service owner," "content operator" | `Audience` |
| `Place` | A geography served. | "Phoenix," "Grand Strand" | `Place` / `LocalBusiness` |

## How to choose a type

- If it is *done for* a customer → `Service`. If it is *sold as a thing* → `Product`.
- If it is *how* something is done → `Method`. If it is *the job being done* → `Use Case`.
- If it is *what the customer gets* → `Outcome`. If it is *what hurts* → `Problem`.
- If it is *who* → `Customer`/`Industry`. If it is *where* → `Place`. If it is *a named instrument* → `Tool`.

## Typing rules

- **One type per node.** A node that is both a Service and a Method is two nodes with an edge (`the service depends on the method`).
- **Outcomes and Problems pair.** Most Problems have a matching Outcome on the other side of a Service that resolves it. Model both; link them.
- **Industries and Places are connective tissue.** They rarely need their own deep page early, but they link many nodes together and ground local SEO. Keep them as nodes even when they are `supporting`/`attribute`.
- **Generic terms are not types' escape hatch.** "Solution," "platform," "technology" usually mean the node is vague. Re-name it as the concrete Service/Product/Method it actually is.

## Worked micro-example

Input: "We do AI sales-data analysis for independent retailers."

- `AI sales-data analysis` — **Service** (pillar)
- `Margin analysis` — **Method** (supporting) — *part of* the service
- `Demand forecasting` — **Use Case** (supporting) — *part of* the service
- `Margin leakage` — **Problem** (supporting) — the service *resolves* it
- `Fewer stockouts` — **Outcome** (attribute) — the service *produces* it
- `Independent retail` — **Industry** (supporting) — the service *serves* it
- `QuickBooks export` — **Tool** (attribute) — the method *depends on* it

Seven nodes, six stated edges, from one sentence. Scale that across every sentence a business can say about itself and the graph gets large fast — which is the point.
